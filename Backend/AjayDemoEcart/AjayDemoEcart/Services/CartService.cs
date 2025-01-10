using AjayDemoEcart.Interfaces.ServicesInterface;
using AjayDemoEcart.Models;
using AjayDemoEcart.Repositories;
using Microsoft.AspNetCore.Cors.Infrastructure;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AjayDemoEcart.Services
{
    public class CartService : ICartService
    {
        private readonly CartRepository _cartRepository;

        public CartService(CartRepository cartRepository)
        {
            _cartRepository = cartRepository;
        }

        public async Task<IEnumerable<Cart>> GetAllCartsAsync()
        {
            return await _cartRepository.GetAllAsync();
        }

        public async Task<Cart> GetCartByIdAsync(int id)
        {
            return await _cartRepository.GetByIdAsync(id);
        }

        public async Task<IEnumerable<Cart>> GetCartsByUserIdAsync(int userId)
        {
            return await _cartRepository.GetByUserIdAsync(userId);
        }

        public async Task<Cart> AddToCartAsync(Cart cart)
        {
            return await _cartRepository.AddAsync(cart);
        }

        public async Task<bool> UpdateCartAsync(int id, Cart cart)
        {
            return await _cartRepository.UpdateAsync(id, cart);
        }

        public async Task<bool> DeleteCartAsync(int id)
        {
            return await _cartRepository.DeleteAsync(id);
        }

        public async Task<bool> ClearCartByUserIdAsync(int userId)
        {
            return await _cartRepository.ClearByUserIdAsync(userId);
        }
    }
}
