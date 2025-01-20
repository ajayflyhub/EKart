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
        var existingUser = await _userRepository.GetUserByIdAsync(id);
        if (existingUser == null) return false;

        await _userRepository.DeleteUserAsync(id);
        return true;
    }

    public async Task<string> AuthenticateUserAsync(string username, string password)
    {
        var user = await _userRepository.GetUserByUsernameAsync(username);
        if (user == null || user.PasswordHash != password)
            return null;
        return _jwtService.GenerateToken(user);
    }
}
