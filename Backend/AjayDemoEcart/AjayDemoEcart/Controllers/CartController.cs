using AjayDemoEcart.Interfaces.ServicesInterface;
using AjayDemoEcart.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class CartsController : ControllerBase
{
    private readonly ICartService _cartService;

    public CartsController(ICartService cartService)
    {
        _cartService = cartService;
    }

    [HttpGet]
    [Authorize(Roles = "Admin" )]
    public async Task<ActionResult<IEnumerable<Cart>>> GetAllCarts()
    {
        var carts = await _cartService.GetAllCartsAsync();
        return Ok(carts);
    }

    [HttpGet("{id}")]
    [Authorize]
    public async Task<ActionResult<Cart>> GetCartById(int id)
    {
        var cart = await _cartService.GetCartByIdAsync(id);
        if (cart == null)
        {
            return NotFound($"Cart with ID {id} not found.");
        }
        return Ok(cart);
    }

    [HttpGet("user/{userId}")]
    [Authorize(Roles = "Admin,customer")]
    public async Task<ActionResult<IEnumerable<Cart>>> GetCartsByUserId(int userId)
    {
        var carts = await _cartService.GetCartsByUserIdAsync(userId);
        if (carts == null || !carts.Any())
        {
            return Ok(new List<Cart>());
        }
        return Ok(carts);
    }

    [HttpPost("AddToCart")]
    [Authorize(Roles = "Admin,customer")]
    public async Task<ActionResult<Cart>> AddToCart([FromQuery] int productId, [FromQuery] int userId)
    {
        Console.WriteLine($"Adding product {productId} to cart for user {userId}");
        try
        {
            var addedCart = await _cartService.AddToCartAsync(productId, userId);
            return CreatedAtAction(nameof(GetCartById), new { id = addedCart.Id }, addedCart);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }


    [HttpDelete("RemoveFromCart")]
    [Authorize(Roles = "Admin,customer")]
    public async Task<IActionResult> RemoveFromCart([FromQuery] int productId, [FromQuery] int userId)
    {
        try
        {
            var success = await _cartService.RemoveFromCartAsync(productId, userId);
            Console.WriteLine($"this1 is cart service {productId}, UserId: {userId}");
            if (!success)
            {
                return NotFound(new { message = $"Product with ID {productId} not found in the cart for User with ID {userId}." });
            }

            Console.WriteLine($"this2");
            return Ok(success);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }



    [HttpPut("updateCart/{id}")]
    [Authorize(Roles = "Admin,customer")]
    public async Task<IActionResult> UpdateCart(int id, [FromBody] Cart cart)
    {
        if (id != cart.Id)
        {
            return BadRequest("Cart ID mismatch.");
        }

        var success = await _cartService.UpdateCartAsync(id, cart);
        if (!success)
        {
            return NotFound($"Cart with ID {id} not found.");
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteCart(int id)
    {
        var success = await _cartService.DeleteCartAsync(id);
        if (!success)
        {
            return NotFound($"Cart with ID {id} not found.");
        }

        return NoContent();
    }

    [HttpDelete("clearCart/{userId}")]
    [Authorize(Roles = "Admin,customer")]
    public async Task<IActionResult> ClearCart(int userId)
    {
        try
        {
            var success = await _cartService.ClearCartByUserIdAsync(userId);
            if (!success)
            {
                return Ok   (new { message = $"No items found in the cart for User with ID {userId}." });
            }

            return Ok(new { message = "Cart cleared successfully." });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }
}
