using AjayDemoEcart.Models;
using System.Threading.Tasks;

namespace AjayDemoEcart.Repositories
{

    public class EmailRepository : IEmailRepositoryInterface
    {
        public async Task SaveEmailAsync(Email email)
        {
            await Task.CompletedTask;
        }
    }
}
