using AjayDemoEcart.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AjayDemoEcart.Interfaces.RepositoryInterface
{
    public interface IOrderRepositoryInterface
    {
        Task<IEnumerable<Order>> GetAllOrdersAsync();
        Task<Order> GetOrderByIdAsync(int id);
        Task<IEnumerable<Order>> GetOrdersByUserIdAsync(int userId);
        Task<Order> CreateOrderAsync(Order order);
        Task<bool> UpdateOrderAsync(int id, Order order);
        Task<bool> DeleteOrderAsync(int id);
    }
}
