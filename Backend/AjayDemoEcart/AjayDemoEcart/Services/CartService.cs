using AjayDemoEcart.Interfaces.ServicesInterface;
using AjayDemoEcart.Models;
using System.Linq;

public class CartService : ICartService
{
    private readonly ICartRepository _cartRepository;

    public CartService(ICartRepository cartRepository)
    {
        _cartRepository = cartRepository;
    }
    public async Task<bool> ClearCartAsync(int userId)
    {
        var userCart = await _cartRepository.GetByUserIdAsync(userId);

        if (userCart == null || !userCart.Any())
        {
            return false;
        }

        await _cartRepository.ClearCartAsync(userId);
        return true;
    }


    public async Task<IEnumerable<Cart>> GetAllCartsAsync()
    {
        return await _cartRepository.GetAllAsync();
    }

    public async Task<Cart> GetCartByIdAsync(int id)
    {
        return await _cartRepository.GetByIdAsync(id);
    }

    public async Task<bool> RemoveFromCartAsync(int productId, int userId)
    {
        return await _cartRepository.RemoveFromCartAsync(productId, userId);
    }

    public async Task<IEnumerable<Cart>> GetCartsByUserIdAsync(int userId)
    {
        return await _cartRepository.GetByUserIdAsync(userId);
    }

    public async Task<Cart> AddToCartAsync(int productId, int userId, int quantity = 1)
    {
        var existingCartItems = await _cartRepository.GetByUserIdAsync(userId);
        var cartItem = existingCartItems.FirstOrDefault(item => item.ProductId == productId);

        if (cartItem == null)
        {
            cartItem = new Cart
            {
                UserId = userId,
                ProductId = productId,
                Quantity = quantity,
                CreatedAt = DateTime.UtcNow
            };
            await _cartRepository.AddAsync(cartItem);
        }
        else
        {
            cartItem.Quantity += quantity;
            await _cartRepository.UpdateAsync(cartItem.Id, cartItem);
        }

        return cartItem;
    }

    public async Task<bool> UpdateCartAsync(int id, Cart cart)
    {
        if (id != cart.Id)
        {
            throw new ArgumentException("Cart ID mismatch.");
        }

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
