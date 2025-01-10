using AjayDemoEcart.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AjayDemoEcart.Interfaces.RepositoryInterface
{
    public interface IProductRepositoryInterface
    {
        Task<IEnumerable<Product>> GetAllAsync();
        Task<Product> GetByIdAsync(int id);
        Task<Product> AddAsync(Product product);
        Task<bool> UpdateAsync(int id, Product product);
        Task<bool> DeleteAsync(int id);
    }
}
