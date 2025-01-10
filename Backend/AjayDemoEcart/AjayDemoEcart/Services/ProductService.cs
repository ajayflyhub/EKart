using AjayDemoEcart.Interfaces.ServicesInterface;
using AjayDemoEcart.Models;
using AjayDemoEcart.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AjayDemoEcart.Services
{
    public class ProductService : IProductServiceInterface
    {
        private readonly ProductRepository _productRepository;

        public ProductService(ProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            return await _productRepository.GetAllAsync();
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _productRepository.GetByIdAsync(id);
        }

        public async Task<Product> CreateProductAsync(Product product)
        {
            return await _productRepository.AddAsync(product);
        }

        public async Task<bool> UpdateProductAsync(int id, Product product)
        {
            return await _productRepository.UpdateAsync(id, product);
        }

        public async Task<bool> DeleteProductAsync(int id)
        {
            return await _productRepository.DeleteAsync(id);
        }
    }
}
