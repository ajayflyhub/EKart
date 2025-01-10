using AjayDemoEcart.Interfaces.ServicesInterface;
using AjayDemoEcart.Models;
using AjayDemoEcart.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AjayDemoEcart.Services
{
    public class OrderService : IOrderServiceInterface
    {
        private readonly OrderRepository _orderRepository;

        public OrderService(OrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public async Task<IEnumerable<Order>> GetAllOrdersAsync()
        {
            return await _orderRepository.GetAllOrdersAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id)
        {
            return await _orderRepository.GetOrderByIdAsync(id);
        }

        public async Task<IEnumerable<Order>> GetOrdersByUserIdAsync(int userId)
        {
            return await _orderRepository.GetOrdersByUserIdAsync(userId);
        }

        public async Task<Order> CreateOrderAsync(Order order)
        {
            return await _orderRepository.CreateOrderAsync(order);
        }

        public async Task<bool> UpdateOrderAsync(int id, Order order)
        {
            return await _orderRepository.UpdateOrderAsync(id, order);
        }

        public async Task<bool> DeleteOrderAsync(int id)
        {
            return await _orderRepository.DeleteOrderAsync(id);
        }
    }
}
