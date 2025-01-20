using AjayDemoEcart.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AjayDemoEcart.Interfaces.ServicesInterface
{
    public interface ICartService
    {
        // Retrieves all carts
        Task<IEnumerable<Cart>> GetAllCartsAsync();
        Task<Cart> GetCartByIdAsync(int id);
        Task<IEnumerable<Cart>> GetCartsByUserIdAsync(int userId);
        Task<bool> RemoveFromCartAsync(int productId, int userId);
        Task<Cart> AddToCartAsync(int productId, int userId, int quantity = 1);
        Task<bool> UpdateCartAsync(int id, Cart cart);
        Task<bool> DeleteCartAsync(int id);
        Task<bool> ClearCartByUserIdAsync(int userId);
    }
}
