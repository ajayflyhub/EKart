using AjayDemoEcart.Models;
using AjayDemoEcart.Interfaces.ServicesInterface;
using System.Threading.Tasks;
using System.Collections.Generic;
using BCrypt.Net;
using System;

public class UserService : IUserServiceInterface
{
    private readonly IUserRepositoryInterface _userRepository;
    private readonly IJwtService _jwtService;

    public UserService(IUserRepositoryInterface userRepository, IJwtService jwtService)
    {
        _userRepository = userRepository;
        _jwtService = jwtService;
    }

    public async Task<IEnumerable<User>> GetAllUsersAsync()
    {
        return await _userRepository.GetAllUsersAsync();
    }

    public async Task<User> GetUserByIdAsync(int id)
    {
        return await _userRepository.GetUserByIdAsync(id);
    }

    public async Task<User> RegisterUserAsync(User user)
    {
        // Hash the password before saving the user
        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);
        return await _userRepository.AddUserAsync(user);
    }

    public async Task<bool> UpdateUserAsync(int id, User user)
    {
        var existingUser = await _userRepository.GetUserByIdAsync(id);
        if (existingUser == null) return false;

        existingUser.Username = user.Username ?? existingUser.Username;
        existingUser.Email = user.Email ?? existingUser.Email;
        existingUser.Role = user.Role ?? existingUser.Role;
        existingUser.PasswordHash = user.PasswordHash;
        await _userRepository.UpdateUserAsync(id, existingUser);
        return true;
    }

    public async Task<bool> DeleteUserAsync(int id)
    {
        var user = await _userRepository.GetUserByIdAsync(id);
        if (user == null) return false;

        user.IsActive = !user.IsActive;  // Toggle the status

        // Update the user's IsActive status in the database
        await _userRepository.DeleteUserAsync(id);
        return true;
    }

    public async Task<string> AuthenticateUserAsync(string username, string password)
    {
        if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
        {
            throw new ArgumentNullException("Username and password cannot be null or empty.");
        }
        var user = await _userRepository.GetUserByUsernameAsync(username);
        if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
        {
            return null;
        }
        return _jwtService.GenerateToken(user);
    }

    public async Task<bool> UserExistsAsync(string username)
    {
        var user = await _userRepository.GetUserByUsernameAsync(username);
        return user != null;
    }

    public async Task<bool> EmailExistsAsync(string email)
    {
        var user = await _userRepository.GetUserByEmailAsync(email); // Add GetUserByEmailAsync in the repository
        return user != null;
    }
}
