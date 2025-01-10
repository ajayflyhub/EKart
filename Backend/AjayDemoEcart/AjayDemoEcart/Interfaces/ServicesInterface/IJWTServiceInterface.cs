using System.Security.Claims;

public interface IJwtService
{
    string GenerateToken(User user);
}
