using AjayDemoEcart.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AjayDemoEcart.Interfaces.ServicesInterface
{
    public interface ICartService
    {
        Task<IEnumerable<Cart>> GetAllCartsAsync();
        Task<Cart> GetCartByIdAsync(int id);
        Task<IEnumerable<Cart>> GetCartsByUserIdAsync(int userId);
        Task<Cart> AddToCartAsync(Cart cart);
        Task<bool> UpdateCartAsync(int id, Cart cart);
        Task<bool> DeleteCartAsync(int id);
        Task<bool> ClearCartByUserIdAsync(int userId);
    }
}
