using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AjayDemoEcart.Models;
using AjayDemoEcart.Interfaces.ServicesInterface;

public class UserService : IUserService
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
        // Directly store the password as entered (without hashing)
        return await _userRepository.AddUserAsync(user);
    }

    public async Task<bool> UpdateUserAsync(int id, User user)
    {
        var existingUser = await _userRepository.GetUserByIdAsync(id);
        if (existingUser == null) return false;

        existingUser.Username = user.Username ?? existingUser.Username;
        existingUser.Email = user.Email ?? existingUser.Email;
        existingUser.Role = user.Role ?? existingUser.Role;
        existingUser.PasswordHash = user.PasswordHash; // Directly store the password as entered

        // Correctly pass the id and updated user
        await _userRepository.UpdateUserAsync(id, existingUser); // Pass both id and updated user
        return true;
    }

    public async Task<bool> DeleteUserAsync(int id)
    {
        var existingUser = await _userRepository.GetUserByIdAsync(id);
        if (existingUser == null) return false;

        await _userRepository.DeleteUserAsync(id);
        return true;
    }

    public async Task<string> AuthenticateUserAsync(string username, string password)
    {
        var user = await _userRepository.GetUserByUsernameAsync(username);
        if (user == null || user.PasswordHash != password) // Compare plain text passwords
            return null;

        // Generate JWT token
        return _jwtService.GenerateToken(user);
    }
}
