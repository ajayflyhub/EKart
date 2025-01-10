using AjayDemoEcart.Models;
using AjayDemoEcart.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AjayDemoEcart.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class CartsController : ControllerBase
    {
        private readonly CartService _cartService;

        public CartsController(CartService cartService)
        {
            _cartService = cartService;
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
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

        [HttpGet("User/{userId}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Cart>>> GetCartsByUserId(int userId)
        {
            var carts = await _cartService.GetCartsByUserIdAsync(userId);
            if (carts == null || !carts.Any())
            {
                return NotFound($"No carts found for user with ID {userId}.");
            }

            return Ok(carts);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Cart>> AddToCart(Cart cart)
        {
            if (cart == null)
            {
                return BadRequest("Cart cannot be null.");
            }

            var addedCart = await _cartService.AddToCartAsync(cart);
            return CreatedAtAction(nameof(GetCartById), new { id = addedCart.Id }, addedCart);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateCart(int id, Cart cart)
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
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteCart(int id)
        {
            var success = await _cartService.DeleteCartAsync(id);
            if (!success)
            {
                return NotFound($"Cart with ID {id} not found.");
            }

            return NoContent();
        }

        [HttpDelete("User/{userId}")]
        [Authorize]
        public async Task<IActionResult> ClearCartByUserId(int userId)
        {
            var success = await _cartService.ClearCartByUserIdAsync(userId);
            if (!success)
            {
                return NotFound($"No carts found for user with ID {userId}.");
            }

            return NoContent();
        }
    }
}
