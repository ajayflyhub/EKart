using Microsoft.AspNetCore.Mvc;
using AjayDemoEcart.Data;

[ApiController]
[Route("api/[controller]")]
public class TestController : ControllerBase
{
    private readonly DataContext _context;

    public TestController(DataContext context)
    {
        _context = context;
    }

    [HttpGet("test-db")]
    public IActionResult TestDatabase()
    {
        try
        {
            var usersCount = _context.Users.Count();
            return Ok($"Database connected successfully. Users count: {usersCount}");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Database connection failed: {ex.Message}");
        }
    }
}
