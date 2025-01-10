using System.IO;
using MailKit.Net.Smtp;
using MimeKit;

public class EmailService
{
    private readonly IConfiguration _configuration;
    private readonly IWebHostEnvironment _environment;

    public EmailService(IConfiguration configuration, IWebHostEnvironment environment)
    {
        _configuration = configuration;
        _environment = environment;
    }

    public async Task SendEmailAsync(string toEmail, string subject, string body)
    {
        var emailSettings = _configuration.GetSection("EmailSettings");

        var email = new MimeMessage();
        email.From.Add(new MailboxAddress(emailSettings["SenderName"], emailSettings["SenderEmail"]));
        email.To.Add(MailboxAddress.Parse(toEmail));
        email.Subject = subject;
        email.Body = new TextPart("html") { Text = body };

        using var smtp = new SmtpClient();
        try
        {
            await smtp.ConnectAsync(emailSettings["SmtpServer"], int.Parse(emailSettings["Port"]), MailKit.Security.SecureSocketOptions.StartTls);
            await smtp.AuthenticateAsync(emailSettings["SenderEmail"], emailSettings["SenderPassword"]);
            await smtp.SendAsync(email);
        }
        catch (Exception ex)
        {
            // Log or handle the error
            throw new InvalidOperationException("Email sending failed.", ex);
        }
        finally
        {
            await smtp.DisconnectAsync(true);
        }
    }


    public string LoadEmailTemplate(string templateName, Dictionary<string, string> placeholders)
    {
        var templatePath = Path.Combine(_environment.ContentRootPath, "Templates", templateName);

        if (!File.Exists(templatePath))
        {
            throw new FileNotFoundException($"Email template '{templateName}' not found.");
        }

        var templateContent = File.ReadAllText(templatePath);

        foreach (var placeholder in placeholders)
        {
            templateContent = templateContent.Replace($"{{{{{placeholder.Key}}}}}", placeholder.Value);
        }

        return templateContent;
    }
}
