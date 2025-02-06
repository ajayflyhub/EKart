using AjayDemoEcart.Models;
using AjayDemoEcart.Repositories;
using AjayDemoEcart.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace AjayDemoEcart.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly EmailService _emailService;
        private readonly EmailRepository _emailRepository;

        public EmailController(EmailService emailService, EmailRepository emailRepository)
        {
            _emailService = emailService;
            _emailRepository = emailRepository;
        }

        [HttpPost("send-email")]
        public async Task<IActionResult> SendEmail([FromBody] Email email)
        {
            if (email == null)
            {
                return BadRequest("Request body cannot be null.");
            }
            email.RecipientEmail = "ajay@flyhub.com";

            if (string.IsNullOrWhiteSpace(email.SenderEmail) ||
                string.IsNullOrWhiteSpace(email.Subject))
            {
                return BadRequest("SenderEmail and Subject are required fields.");
            }

            email.Content = $@"
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }}
            .email-container {{
                max-width: 600px;
                margin: 20px auto;
                background: #ffffff; /* off-white */
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                border: 1px solid #dfe3ea;
            }}
            .header {{
                background-color: #364d79; /* dark blue */
                color: #ffffff;
                padding: 15px 20px;
                text-align: center;
                border-radius: 10px 10px 0 0;
            }}
            .content {{
                padding: 20px;
                text-align: left;
                color: #333;
            }}
            .content p {{
                margin: 0 0 10px;
                line-height: 1.6;
            }}
            .footer {{
                margin-top: 20px;
                text-align: center;
                font-size: 12px;
                color: #888;
                background-color: #e9f1f7; /* light blue */
                padding: 10px;
                border-radius: 0 0 10px 10px;
            }}
        </style>
    </head>
    <body>
        <div class='email-container'>
            <div class='header'>
                <h1>AJEKART</h1>
            </div>
            <div class='content'>
                <p>Dear User,</p>
                <p>{email.Subject}</p>
                <p>{email.Content}</p>
                <p>Best regards,<br>Team AJEKART</p>
            </div>
            <div class='footer'>
                &copy; 2025 AJAY. All rights reserved.
            </div>
        </div>
    </body>
    </html>";


            email.IsHtml = true; // Ensure email is sent in HTML format

            try
            {
                await _emailRepository.SaveEmailAsync(email);
                await _emailService.SendEmailAsync(email);

                return Ok("Email sent successfully!");
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to send email: {ex.Message}");
            }
        }
    }
}
