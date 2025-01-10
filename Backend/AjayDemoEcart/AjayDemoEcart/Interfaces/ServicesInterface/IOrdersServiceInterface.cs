using AjayDemoEcart.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AjayDemoEcart.Interfaces.ServicesInterface
{
    public interface IOrdersServiceInterface
    {
        Task<IEnumerable<Order>> GetOrdersAsync();
        Task<Order> GetOrderByIdAsync(int id);
    }
}
