using AjayDemoEcart.Data;
using AjayDemoEcart.Interfaces.RepositoryInterface;
using AjayDemoEcart.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AjayDemoEcart.Repositories
{
    public class OrdersRepository : IOrdersRepositoryInterface
    {
        private readonly DataContext _context;

        public OrdersRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Order>> GetOrdersAsync()
        {
            return await _context.Orders.ToListAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id)
        {
            return await _context.Orders.FindAsync(id);
        }
    }
}
