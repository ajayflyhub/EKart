using AjayDemoEcart.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly IUserServiceInterface _userService;
    private readonly IAddressService _addressService;

    public UsersController(IUserServiceInterface userService, IAddressService addressService)
    {
        _userService = userService;
        _addressService = addressService;
    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateUser([FromBody] User user)
    {
        if (await _userService.UserExistsAsync(user.Username))
        {
            return BadRequest("Username is already taken.");
        }
        if (await _userService.EmailExistsAsync(user.Email))
        {
            return BadRequest("Email is already in use.");
        }
        var passwordUser = user.PasswordHash;
        var createdUser = await _userService.RegisterUserAsync(user);
        Console.WriteLine(user);
        var token = await _userService.AuthenticateUserAsync(user.Username, passwordUser);

        if (token == null)
        {
            return Unauthorized("Authentication failed.");
        }
        return CreatedAtAction(nameof(GetUserById), new { id = createdUser.Id }, new { token });
    }



    [HttpGet("Allusers")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
    {
        var users = await _userService.GetAllUsersAsync();
        return Ok(users);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UserDto>> GetUserById(int id)
    {
        var user = await _userService.GetUserByIdAsync(id);
        if (user == null)
        {
            return NotFound("User not found.");
        }

        var addresses = await _addressService.GetAddressByIdAsync(id); // Fetch user's addresses
        //var orders = await _userService.GetOrdersByUserIdAsync(id);  // Fetch user's orders

        // Map to UserDto and include additional information
        var userDto = new UserDto
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            Role = user.Role,
            PhoneNumber = user.PhoneNumber,
            Address = user.Address, // Include the user's main address here
            //Addresses = addresses.Select(a => new AddressDto
            //{
            //    Id = a.Id,
            //    Street = a.Street,
            //    City = a.City,
            //    State = a.State,
            //    ZipCode = a.ZipCode
            //}).ToList(),  // Map the address data to AddressDto
            //Orders = orders.Select(o => new OrderDto
            //{
            //    OrderId = o.OrderId,
            //    ProductName = o.ProductName,
            //    Quantity = o.Quantity,
            //    OrderDate = o.OrderDate
            //}).ToList()  // Map the order data to OrderDto
        };

        return Ok(userDto);
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<ActionResult> UpdateUser(int id, [FromBody] User user)
    {
        var existingUser = await _userService.GetUserByIdAsync(id);
        if (existingUser == null)
        {
            return NotFound("User not found.");
        }

        // Check if username or email already exists for another user
        if (!string.IsNullOrEmpty(user.Username) && user.Username != existingUser.Username)
        {
            if (await _userService.UserExistsAsync(user.Username))
            {
                return BadRequest("Username is already taken.");
            }
            existingUser.Username = user.Username;
        }

        if (!string.IsNullOrEmpty(user.Email) && user.Email != existingUser.Email)
        {
            if (await _userService.EmailExistsAsync(user.Email))
            {
                return BadRequest("Email is already in use.");
            }
            existingUser.Email = user.Email;
        }

        if (!string.IsNullOrEmpty(user.PasswordHash))
        {
            existingUser.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);
        }

        // Update address and phone number
        if (!string.IsNullOrEmpty(user.Address) && user.Address != existingUser.Address)
        {
            existingUser.Address = user.Address;
        }

        if (!string.IsNullOrEmpty(user.PhoneNumber) && user.PhoneNumber != existingUser.PhoneNumber)
        {
            existingUser.PhoneNumber = user.PhoneNumber;
        }

        var isUpdated = await _userService.UpdateUserAsync(id, existingUser);
        if (!isUpdated)
        {
            return NotFound("User not found.");
        }

        return Ok(existingUser);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> DeleteUser(int id)
    {
        var result = await _userService.DeleteUserAsync(id);
        if (!result) return NotFound("User not found");
        return Ok("User status updated successfully");
    }

    [HttpPost("login")]
    public async Task<ActionResult<string>> Login([FromBody] LoginRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        if (string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Password))
        {
            return BadRequest("Username and password are required.");
        }

        var token = await _userService.AuthenticateUserAsync(request.Username, request.Password);
        if (token == null)
        {
            return Unauthorized("Invalid username or password.");
        }

        return Ok(new { token });
    }

    // Address Management

    [HttpPost("address/{userId}")]
    [Authorize]
    public async Task<ActionResult<Address>> CreateAddress(int userId, [FromBody] Address address)
    {
        var user = await _userService.GetUserByIdAsync(userId);
        if (user == null)
        {
            return NotFound("User not found.");
        }

        address.UserId = userId; // Associate address with user

        var createdAddress = await _addressService.AddAddressAsync(address);
        return CreatedAtAction(nameof(GetAddressesByUserId), new { id = createdAddress.Id }, createdAddress);
    }

    [HttpGet("addresses")]
    [Authorize]
    public async Task<ActionResult<IEnumerable<Address>>> GetAllAddresses()
    {
        var addresses = await _addressService.GetAllAddressesAsync();

        if (addresses == null)
        {
            return Ok(new List<Address>());
        }

        return Ok(addresses);
    }

    [HttpGet("addresses/user/{userId}")]
    [Authorize]
    public async Task<ActionResult<IEnumerable<Address>>> GetAddressesByUserId(int userId)
    {
        var addresses = await _addressService.GetAddressesByUserIdAsync(userId); // Fix variable name and call appropriate method

        if (addresses == null || !addresses.Any())
        {
            return NoContent();
        }

        return Ok(addresses);
    }


    [HttpPut("address/{id}")]
    [Authorize]
    public async Task<ActionResult> UpdateAddress(int id, [FromBody] Address address)
    {
        var isUpdated = await _addressService.UpdateAddressAsync(id, address);
        if (!isUpdated) return NoContent();
        return NoContent();
    }

    [HttpDelete("address/{id}")]
    [Authorize]
    public async Task<ActionResult> DeleteAddress(int id)
    {
        var isDeleted = await _addressService.DeleteAddressAsync(id);
        if (!isDeleted) return NoContent();
        return NoContent();
    }


    [HttpPut("activate/{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> ActivateUser(int id)
    {
        var user = await _userService.GetUserByIdAsync(id);
        if (user == null)
        {
            return NotFound("User not found.");
        }

        user.IsActive = true; // Assuming `IsActive` is a property in the User model
        var isUpdated = await _userService.UpdateUserAsync(id, user);
        if (!isUpdated)
        {
            return BadRequest("Failed to activate user.");
        }

        return Ok("User activated successfully.");
    }

    [HttpPut("deactivate/{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> DeactivateUser(int id)
    {
        var user = await _userService.GetUserByIdAsync(id);
        if (user == null)
        {
            return NotFound("User not found.");
        }

        user.IsActive = false; // Assuming `IsActive` is a property in the User model
        var isUpdated = await _userService.UpdateUserAsync(id, user);
        if (!isUpdated)
        {
            return BadRequest("Failed to deactivate user.");
        }

        return Ok("User deactivated successfully.");
    }

}

public class LoginRequest
{
    [Required(ErrorMessage = "Username is required.")]
    public string Username { get; set; }

    [Required(ErrorMessage = "Password is required.")]
    public string Password { get; set; }
}
