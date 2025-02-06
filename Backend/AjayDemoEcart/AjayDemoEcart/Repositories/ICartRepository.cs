using AjayDemoEcart.Data;
using AjayDemoEcart.Interfaces.ServicesInterface;
using AjayDemoEcart.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class CartRepository : ICartRepository
{
    private readonly DataContext _context;

    public CartRepository(DataContext context)
    {
        _context = context;
    }

    public async Task<Cart> AddAsync(Cart cart)
    {
        await _context.Carts.AddAsync(cart);
        await _context.SaveChangesAsync();
        return cart;
    }

    public async Task ClearCartAsync(int userId)
    {
        var userCartItems = _context.Carts.Where(c => c.UserId == userId);

        if (userCartItems.Any())
        {
            _context.Carts.RemoveRange(userCartItems);
            await _context.SaveChangesAsync();
        }
    }


    public async Task<Cart> GetByIdAsync(int id)
    {
        return await _context.Carts
            .Include(c => c.Product)
            .FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<IEnumerable<Cart>> GetAllAsync()
    {
        return await _context.Carts
            .Include(c => c.Product)
            .ToListAsync();
    }

    public async Task<bool> RemoveFromCartAsync(int productId, int userId)
    {
        var cartItem = await _context.Carts
            .FirstOrDefaultAsync(c => c.ProductId == productId && c.UserId == userId);

        if (cartItem == null)
        {
            return false;
        }

        _context.Carts.Remove(cartItem);
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<IEnumerable<Cart>> GetByUserIdAsync(int userId)
    {
        return await _context.Carts
            .Where(cart => cart.UserId == userId)
            .Include(cart => cart.Product)
            .ToListAsync();
    }

    public async Task<bool> UpdateAsync(int id, Cart cart)
    {
        var existingCart = await _context.Carts.FindAsync(id);
        if (existingCart == null) return false;

        // Update the cart item details (e.g., Quantity, Product)
        _context.Entry(existingCart).CurrentValues.SetValues(cart);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var cart = await _context.Carts.FindAsync(id);
        if (cart == null) return false;

        _context.Carts.Remove(cart);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> ClearByUserIdAsync(int userId)
    {
        var carts = _context.Carts.Where(cart => cart.UserId == userId);
        if (!carts.Any()) return false;

        _context.Carts.RemoveRange(carts);
        await _context.SaveChangesAsync();
        return true;
    }

}
