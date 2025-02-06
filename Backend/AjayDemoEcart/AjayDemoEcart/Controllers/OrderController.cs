using AjayDemoEcart.Data;
using AjayDemoEcart.Models;
using AjayDemoEcart.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AjayDemoEcart.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly DataContext _context;

        public OrderController(IOrderService orderService, DataContext context)
        {
            _orderService = orderService;
            _context = context;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<Order>>> GetAllOrders()
        {
            var orders = await _orderService.GetAllOrdersAsync();
            return Ok(orders);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,customer")]
        public async Task<ActionResult<Order>> GetOrderById(int id)
        {
            var order = await _orderService.GetOrderByIdAsync(id);
            if (order == null)
            {
                return Ok(new object[] { });
            }
            return Ok(order);
        }

        [HttpGet("User/{userId}")]
        [Authorize(Roles = "Admin,customer")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrdersByUserId(int userId)
        {
            var orders = await _orderService.GetOrdersByUserIdAsync(userId);
            if (orders == null || !orders.Any())
            {
                 return Ok(new object[] { });
            }

            return Ok(orders);
        }

        [HttpPost("User/{userId}")]
        [Authorize(Roles = "Admin,customer")]
        public async Task<IActionResult> CreateOrderAsync(int userId, [FromBody] Order order)
        {
            if (order == null)
            {
                return BadRequest("Order is required.");
            }

            // Fetch the user's wallet
            var wallet = await _context.Wallets.FirstOrDefaultAsync(w => w.UserId == userId);
            if (wallet == null)
            {
                return BadRequest("Wallet not found.");
            }

            // Fetch products based on the productIds sent from the frontend
            var products = await _context.Products
                .Where(p => order.ProductIds.Contains(p.Id))
                .ToListAsync();

            if (!products.Any())
            {
                return BadRequest("No valid products found.");
            }

            // Calculate subtotal, taxes, and total price
            decimal subtotal = products.Sum(p => p.Price);
            decimal taxes = subtotal * 0.18m; // Example tax rate (18%)
            decimal totalPrice = subtotal + taxes;

            // Check if the user has sufficient balance
            if (wallet.Balance < totalPrice)
            {
                return BadRequest("Insufficient wallet balance.");
            }

            // Deduct the amount from the wallet
            wallet.Balance -= totalPrice;
            _context.Wallets.Update(wallet);

            // Set the calculated values in the order
            order.Subtotal = subtotal;
            order.Taxes = taxes;
            order.TotalPrice = totalPrice;
            order.Quantity = products.Count;
            order.UserId = userId;
            order.Status = "Pending";

            // Save the order
            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();

            // Create a transaction record
            var transaction = new Transaction
            {
                UserId = userId,
                Amount = totalPrice,
                Type = "Deduct",
                Status = "Success",
                CreatedAt = DateTime.UtcNow,
                ReferenceId = Guid.NewGuid().ToString()
            };

            await _context.WalletTransactions.AddAsync(transaction);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Order created successfully.", Order = order });
        }



        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] Order order)
        {
            var success = await _orderService.UpdateOrderStatusAsync(id, order.Status);
            if (!success)
            {
                return NotFound($"Order with ID {id} not found.");
            }

            return NoContent();
        }

        [HttpDelete("User/{userId}/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteOrder(int userId, int id)
        {
            var order = await _orderService.GetOrderByIdAsync(id);
            if (order == null || order.UserId != userId)
            {
                return NotFound($"Order with ID {id} not found or does not belong to the user.");
            }

            var success = await _orderService.DeleteOrderAsync(id);
            if (!success)
            {
                return NotFound($"Order with ID {id} not found.");
            }

            return NoContent();
        }
    }
}
