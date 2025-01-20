using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost]
    public async Task<ActionResult<User>> CreateUser([FromBody] User user)
    {
        var createdUser = await _userService.RegisterUserAsync(user);
        return CreatedAtAction(nameof(GetUserById), new { id = createdUser.Id }, createdUser);
    }

    [HttpGet]
    //[Authorize(Roles = "admin")]
    public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
    {
        var users = await _userService.GetAllUsersAsync();
        return Ok(users);
    }

    [HttpGet("{id}")]
    [Authorize]
    public async Task<ActionResult<UserDto>> GetUserById(int id)
    {
        var user = await _userService.GetUserByIdAsync(id);
        if (user == null)
        {
            return NotFound("User not found.");
        }

        var userDto = new UserDto
        {
            Email = user.Email,
            Role = user.Role,
            Username = user.Username,
            Id = user.Id
        };

        return Ok(userDto);
    }

    [HttpPut("{id}")]
    //[Authorize]
    public async Task<ActionResult> UpdateUser(int id, [FromBody] User user)
    {
        var isUpdated = await _userService.UpdateUserAsync(id, user);
        if (!isUpdated) return NotFound("User not found.");
        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "admin")]
    public async Task<ActionResult> DeleteUser(int id)
    {
        var isDeleted = await _userService.DeleteUserAsync(id);
        if (!isDeleted) return NotFound("User not found.");
        return NoContent();
    }

    [HttpPost("login")]
    public async Task<ActionResult<string>> Login([FromBody] LoginRequest request)
    {
        var token = await _userService.AuthenticateUserAsync(request.Username, request.Password);
        if (token == null) return Unauthorized("Invalid username or password.");
        return Ok(new { token });
    }
}

public class LoginRequest
{
    public string Username { get; set; }
    public string Password { get; set; }
}
