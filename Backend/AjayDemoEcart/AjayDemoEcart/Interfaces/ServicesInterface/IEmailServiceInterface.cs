using AjayDemoEcart.Models;

public interface IEmailServiceInterface
{
    Task SendEmailAsync(Email email);
}