using AjayDemoEcart.Interfaces.ServicesInterface;
using AjayDemoEcart.Models;
using AjayDemoEcart.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AjayDemoEcart.Services
{
    public class OrdersService : IOrdersServiceInterface
    {
        private readonly OrdersRepository _orderRepository;

        public OrdersService(OrdersRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public async Task<IEnumerable<Order>> GetOrdersAsync()
        {
            return await _orderRepository.GetOrdersAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id)
        {
            return await _orderRepository.GetOrderByIdAsync(id);
        }
    }
}
