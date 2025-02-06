using AjayDemoEcart.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

public interface IUserServiceInterface
{
    Task<IEnumerable<User>> GetAllUsersAsync();
    Task<bool> UserExistsAsync(string username);
    Task<bool> EmailExistsAsync(string email);
    Task<User> GetUserByIdAsync(int id);
    Task<User> RegisterUserAsync(User user);
    Task<bool> UpdateUserAsync(int id, User user);
    Task<bool> DeleteUserAsync(int id);
    Task<string> AuthenticateUserAsync(string username, string password);
    //Task<bool> ToggleUserStatusAsync(int id);
}
