using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class TestEmailController : ControllerBase
{
    private readonly EmailService _emailService;

    public TestEmailController(EmailService emailService)
    {
        _emailService = emailService;
    }

    [HttpGet("send-test-email")]
    public async Task<IActionResult> SendTestEmail()
    {
        var recipientEmail = "ajay@flyhub.com";
        var subject = "Test Email from ASP.NET Core";
        var body = "<h1>This is a test email sent from your ASP.NET Core application!</h1>";

        try
        {
            await _emailService.SendEmailAsync(recipientEmail, subject, body);
            return Ok("Test email sent successfully!");
        }
        catch (Exception ex)
        {
            return BadRequest($"Failed to send email: {ex.Message}");
        }
    }
}
