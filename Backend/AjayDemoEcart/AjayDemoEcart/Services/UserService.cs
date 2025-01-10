using System.Collections.Generic;
using System.Threading.Tasks;

public class UserService : IUserService
{
    private readonly UserRepository _userRepository;
    private readonly IJwtService _jwtService;

    public UserService(UserRepository userRepository, IJwtService jwtService)
    {
        _userRepository = userRepository;
        _jwtService = jwtService;
    }

    public async Task<IEnumerable<User>> GetAllUsersAsync() => await _userRepository.GetAllUsersAsync();

    public async Task<User> GetUserByIdAsync(int id) => await _userRepository.GetUserByIdAsync(id);

    public async Task<User> RegisterUserAsync(User user) => await _userRepository.AddUserAsync(user);

    public async Task<bool> UpdateUserAsync(int id, User user) => await _userRepository.UpdateUserAsync(id, user);

    public async Task<bool> DeleteUserAsync(int id) => await _userRepository.DeleteUserAsync(id);

    public async Task<string> AuthenticateUserAsync(string username, string password)
    {
        var user = await _userRepository.GetUserByUsernameAsync(username);
        if (user == null || user.PasswordHash != password) return null;

        return _jwtService.GenerateToken(user);
    }
}
