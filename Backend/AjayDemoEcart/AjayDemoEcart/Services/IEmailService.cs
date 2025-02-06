using AjayDemoEcart.Models;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace AjayDemoEcart.Services
{
    public class EmailService : IEmailServiceInterface
    {
        private readonly string _smtpServer = "smtp.gmail.com"; // Gmail SMTP server
        private readonly int _smtpPort = 587; // SMTP port for Gmail
        private readonly string _smtpUsername = "ajay.lakshman41@gmail.com"; // Your Gmail address
        private readonly string _smtpPassword = "tksh lefm nqgc qnog"; // Your Gmail app password

        public async Task SendEmailAsync(Email email)
        {
            using var client = new SmtpClient(_smtpServer)
            {
                Port = _smtpPort,
                Credentials = new NetworkCredential(_smtpUsername, _smtpPassword),
                EnableSsl = true,
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(email.SenderEmail),
                Subject = email.Subject,
                Body = email.Content,
                IsBodyHtml = email.IsHtml, // Set the HTML flag
            };

            mailMessage.To.Add(email.RecipientEmail);

            await client.SendMailAsync(mailMessage);
        }
    }
}
