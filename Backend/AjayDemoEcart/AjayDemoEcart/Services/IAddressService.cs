using AjayDemoEcart.Interfaces;
using AjayDemoEcart.Interfaces.ServicesInterface;
using AjayDemoEcart.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AjayDemoEcart.Services
{
    public class AddressService : IAddressService
    {
        private readonly IAddressRepository _addressRepository;

        public AddressService(IAddressRepository addressRepository)
        {
            _addressRepository = addressRepository;
        }

        public async Task<Address> AddAddressAsync(Address address)
        {
            return await _addressRepository.AddAddressAsync(address);
        }

        public async Task<IEnumerable<Address>> GetAllAddressesAsync()
        {
            return await _addressRepository.GetAllAddressesAsync();
        }

        public async Task<Address> GetAddressByIdAsync(int id)
        {
            return await _addressRepository.GetAddressByIdAsync(id);
        }

        public async Task<IEnumerable<Address>> GetAddressesByUserIdAsync(int userId)
        {
            return await _addressRepository.GetAddressesByUserIdAsync(userId);
        }

        public async Task<bool> UpdateAddressAsync(int id, Address address)
        {
            var existingAddress = await _addressRepository.GetAddressByIdAsync(id);
            if (existingAddress == null) return false;

            // Update only provided fields
            existingAddress.Street = address.Street ?? existingAddress.Street;
            existingAddress.City = address.City ?? existingAddress.City;
            existingAddress.State = address.State ?? existingAddress.State;
            existingAddress.PostalCode = address.PostalCode ?? existingAddress.PostalCode;

            return await _addressRepository.UpdateAddressAsync(existingAddress);
        }

        public async Task<bool> DeleteAddressAsync(int id)
        {
            return await _addressRepository.DeleteAddressAsync(id);
        }
    }
}
