using AjayDemoEcart.Models;

public interface IAddressService
{
    Task<Address> AddAddressAsync(Address address);
    Task<IEnumerable<Address>> GetAllAddressesAsync();
    Task<Address> GetAddressByIdAsync(int id);
    Task<IEnumerable<Address>> GetAddressesByUserIdAsync(int userId);
    Task<bool> UpdateAddressAsync(int id, Address address);
    Task<bool> DeleteAddressAsync(int id);
}