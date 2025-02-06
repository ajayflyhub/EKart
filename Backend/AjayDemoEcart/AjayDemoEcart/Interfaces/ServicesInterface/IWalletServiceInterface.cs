using AjayDemoEcart.Models;
using System.Linq;

namespace AjayDemoEcart.Services
{
    public interface IWalletServiceInterface
    {
        Wallet CreateWallet(int userId);
        Wallet GetWalletByUserId(int userId);
        Wallet LoadMoneyToWallet(int userId, decimal amount);
        Wallet DeductMoneyFromWallet(int userId, decimal amount);
        IQueryable<Transaction> GetTransactionHistory(int userId);
        IEnumerable<Wallet> GetAllWallets();
        void ActivateWallet(int walletId);    // Method to activate wallet
        void DeactivateWallet(int walletId);  // Method to deactivate wallet
        void AddTransaction(Transaction transaction);  // Method to add a transaction
        IQueryable<Transaction> GetAllTransactions();
        IQueryable<Transaction> GetTransactionsByUserId(int userId);
    }
}
