using Microsoft.AspNetCore.Mvc;
using AjayDemoEcart.Models;
using AjayDemoEcart.Services;
using Microsoft.AspNetCore.Authorization;

namespace AjayDemoEcart.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly OrderService _orderService;

        public OrderController(OrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<IEnumerable<Order>>> GetAllOrders()
        {
            var orders = await _orderService.GetAllOrdersAsync();
            return Ok(orders);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<Order>> GetOrderById(int id)
        {
            var order = await _orderService.GetOrderByIdAsync(id);
            if (order == null)
            {
                return NotFound($"Order with ID {id} not found.");
            }

            return Ok(order);
        }

        [HttpGet("User/{userId}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrdersByUserId(int userId)
        {
            var orders = await _orderService.GetOrdersByUserIdAsync(userId);
            if (orders == null || !orders.Any())
            {
                return NotFound("No orders found for this user.");
            }

            return Ok(orders);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Order>> CreateOrder(Order order)
        {
            if (order == null)
            {
                return BadRequest("Order cannot be null.");
            }

            var createdOrder = await _orderService.CreateOrderAsync(order);
            if (createdOrder == null)
            {
                return BadRequest("Failed to create order.");
            }

            return CreatedAtAction(nameof(GetOrderById), new { id = createdOrder.Id }, createdOrder);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> UpdateOrder(int id, Order order)
        {
            if (id != order.Id)
            {
                return BadRequest("Order ID mismatch.");
            }

            var success = await _orderService.UpdateOrderAsync(id, order);
            if (!success)
            {
                return NotFound($"Order with ID {id} not found.");
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var success = await _orderService.DeleteOrderAsync(id);
            if (!success)
            {
                return NotFound($"Order with ID {id} not found.");
            }

            return NoContent();
        }
    }
}
