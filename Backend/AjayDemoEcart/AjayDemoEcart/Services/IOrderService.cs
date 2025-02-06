using AjayDemoEcart.Models;
using AjayDemoEcart.Repositories;

namespace AjayDemoEcart.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly ProductRepository _productRepository;

        public OrderService(IOrderRepository orderRepository, ProductRepository productRepository)
        {
            _orderRepository = orderRepository;
            _productRepository = productRepository;
        }

        public async Task<IEnumerable<Order>> GetAllOrdersAsync()
        {
            return await _orderRepository.GetAllOrdersAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id)
        {
            var order = await _orderRepository.GetOrderByIdAsync(id);
            if (order != null && order.ProductIds != null)
            {
                //order.Products = await _productRepository.GetProductsByIdsAsync(order.ProductIds);
            }
            return order;
        }

        public async Task<IEnumerable<Order>> GetOrdersByUserIdAsync(int userId)
        {
            return await _orderRepository.GetOrdersByUserIdAsync(userId);
        }

        public async Task<Order> CreateOrderAsync(Order order)
        {
            if (string.IsNullOrEmpty(order.OrderNumber))
            {
                order.OrderNumber = GenerateOrderNumber();
            }

            // Calculate the total price using the product repository
            order.Price = await CalculateOrderPrice(order.ProductIds);

            // Set additional fields like Subtotal, Taxes, and Quantity
            order.Subtotal = await CalculateOrderSubtotal(order.ProductIds);
            order.Taxes = await CalculateOrderTaxes(order.ProductIds);
            order.TotalPrice = order.Subtotal + order.Taxes;

            return await _orderRepository.CreateOrderAsync(order);
        }

        public async Task<bool> UpdateOrderStatusAsync(int id, string order)
        {
            return await _orderRepository.UpdateOrderStatusAsync(id, order);
        }

        public async Task<bool> DeleteOrderAsync(int id)
        {
            return await _orderRepository.DeleteOrderAsync(id);
        }

        private string GenerateOrderNumber()
        {
            return $"ORD-{DateTime.UtcNow:yyyyMMddHHmmss}-{Guid.NewGuid().ToString().Substring(0, 6)}";
        }

        private async Task<decimal> CalculateOrderPrice(List<int> productIds)
        {
            decimal totalPrice = 0;

            foreach (var productId in productIds)
            {
                var product = await _productRepository.GetByIdAsync(productId);
                if (product != null)
                {
                    totalPrice += product.Price;
                }
            }

            return totalPrice;
        }

        private async Task<decimal> CalculateOrderSubtotal(List<int> productIds)
        {
            decimal subtotal = 0;

            foreach (var productId in productIds)
            {
                var product = await _productRepository.GetByIdAsync(productId);
                if (product != null)
                {
                    subtotal += product.Price;
                }
            }

            return subtotal;
        }

        private async Task<decimal> CalculateOrderTaxes(List<int> productIds)
        {
            decimal taxes = 0;

            foreach (var productId in productIds)
            {
                var product = await _productRepository.GetByIdAsync(productId);
                if (product != null)
                {
                    taxes += product.Price * 0.18m;  // Assuming a tax rate of 18%
                }
            }

            return taxes;
        }
    }
}
