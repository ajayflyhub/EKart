using AjayDemoEcart.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AjayDemoEcart.Interfaces.ServicesInterface
{
    public interface IProductServiceInterface
    {
        Task<IEnumerable<Product>> GetAllProductsAsync();
        Task<Product> GetProductByIdAsync(int id);
        Task<Product> CreateProductAsync(Product product);
        Task<bool> UpdateProductAsync(int id, Product product);
        Task<bool> DeleteProductAsync(int id);
    }
}
