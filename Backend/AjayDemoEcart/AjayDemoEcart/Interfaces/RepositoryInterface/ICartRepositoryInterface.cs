using AjayDemoEcart.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AjayDemoEcart.Interfaces.ServicesInterface
{
    public interface ICartRepository
    {

        Task<Cart> AddAsync(Cart cart);
        Task<Cart> GetByIdAsync(int id);
        Task<IEnumerable<Cart>> GetAllAsync();
        Task<IEnumerable<Cart>> GetByUserIdAsync(int userId);
        Task<bool> RemoveFromCartAsync(int productId, int userId);
        Task<bool> UpdateAsync(int id, Cart cart);
        Task<bool> DeleteAsync(int id);
        Task<bool> ClearByUserIdAsync(int userId);
    }
}
