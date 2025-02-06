using AjayDemoEcart.Models;

public interface IEmailRepositoryInterface
{
    Task SaveEmailAsync(Email email);
}