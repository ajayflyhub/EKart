using AjayDemoEcart.Data;
using AjayDemoEcart.Interfaces.RepositoryInterface;
using AjayDemoEcart.Models;
using AjayDemoEcart.Services;
using Microsoft.EntityFrameworkCore;

namespace AjayDemoEcart.Repositories
{
    public class CartRepository : ICartRepositoryInterface
    {
        private readonly DataContext _context;

        public CartRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Cart>> GetAllAsync()
        {
            return await _context.Carts.ToListAsync();
        }

        public async Task<Cart> GetByIdAsync(int id)
        {
            return await _context.Carts.FindAsync(id);
        }

        public async Task<IEnumerable<Cart>> GetByUserIdAsync(int userId)
        {
            return await _context.Carts.Where(c => c.UserId == userId).ToListAsync();
        }

        public async Task<Cart> AddAsync(Cart cart)
        {
            await _context.Carts.AddAsync(cart);
            await _context.SaveChangesAsync();
            return cart;
        }

        public async Task<bool> UpdateAsync(int id, Cart cart)
        {
            var existingCart = await _context.Carts.FindAsync(id);
            if (existingCart == null)
            {
                return false;
            }

            _context.Entry(existingCart).CurrentValues.SetValues(cart);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var cart = await _context.Carts.FindAsync(id);
            if (cart != null)
            {
                _context.Carts.Remove(cart);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<bool> ClearByUserIdAsync(int userId)
        {
            var carts = await _context.Carts.Where(c => c.UserId == userId).ToListAsync();
            if (carts.Any())
            {
                _context.Carts.RemoveRange(carts);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<bool> CartExistsAsync(int id)
        {
            return await _context.Carts.AnyAsync(c => c.Id == id);
        }
    }
}
