using AjayDemoEcart.Models;
using System.Linq;

namespace AjayDemoEcart.Repositories
{
    public interface IWalletRepositoryInterface
    {
        Wallet CreateWallet(int userId);
        Wallet GetWalletByUserId(int userId);
        Wallet AddMoneyToWallet(int userId, decimal amount);
        Wallet DeductMoneyFromWallet(int userId, decimal amount);
        IQueryable<Transaction> GetTransactionHistory(int userId);
        void AddTransaction(Transaction transaction);
        void AddWallet(Wallet wallet);
        void ActivateWallet(int walletId);
        void DeactivateWallet(int walletId);
        IEnumerable<Wallet> GetAllWallets();
        IQueryable<Transaction> GetAllTransactions();
        IQueryable<Transaction> GetTransactionsByUserId(int userId);
        void Save();
    }
}
