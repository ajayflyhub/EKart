using AjayDemoEcart.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AjayDemoEcart.Interfaces.RepositoryInterface
{
    public interface ICartRepositoryInterface
    {
        Task<IEnumerable<Cart>> GetAllAsync();
        Task<Cart> GetByIdAsync(int id);
        Task<IEnumerable<Cart>> GetByUserIdAsync(int userId);
        Task<Cart> AddAsync(Cart cart);
        Task<bool> UpdateAsync(int id, Cart cart);
        Task<bool> DeleteAsync(int id);
        Task<bool> ClearByUserIdAsync(int userId);
    }
}
