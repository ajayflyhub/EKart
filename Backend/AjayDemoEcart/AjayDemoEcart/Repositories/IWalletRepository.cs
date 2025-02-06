using AjayDemoEcart.Data;
using AjayDemoEcart.Models;
using System;
using System.Linq;

namespace AjayDemoEcart.Repositories
{
    public class WalletRepository : IWalletRepositoryInterface
    {
        private readonly DataContext _context;

        public WalletRepository(DataContext context)
        {
            _context = context;
        }

        public void UpdateWalletBalance(int userId, decimal amount)
        {
            var wallet = _context.Wallets.FirstOrDefault(w => w.UserId == userId);
            if (wallet != null)
            {
                wallet.Balance += amount;  // Adjust the balance based on the transaction
                wallet.UpdatedAt = DateTime.Now;  // Update the time
                _context.SaveChanges();
            }
        }

        public void AddWallet(Wallet wallet)
        {
            _context.Wallets.Add(wallet);
            Save();
        }

        public Wallet CreateWallet(int userId)
        {
            var existingWallet = _context.Wallets.FirstOrDefault(w => w.UserId == userId);
            if (existingWallet != null)
            {
                throw new Exception("Wallet already exists for this user.");
            }

            var wallet = new Wallet
            {
                UserId = userId,
                Balance = 0,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                IsActive = true
            };

            _context.Wallets.Add(wallet);
            Save();

            return wallet;
        }

        public Wallet GetWalletByUserId(int userId)
        {
            return _context.Wallets.FirstOrDefault(w => w.UserId == userId);
        }

        public Wallet AddMoneyToWallet(int userId, decimal amount)
        {
            var wallet = GetWalletByUserId(userId);
            if (wallet == null) throw new Exception("Wallet not found for user.");
            if (!wallet.IsActive) throw new Exception("Wallet is deactivated.");

            wallet.Balance += amount;
            wallet.UpdatedAt = DateTime.Now;
            _context.Wallets.Update(wallet);
            Save();

            return wallet;
        }

        public Wallet DeductMoneyFromWallet(int userId, decimal amount)
        {
            var wallet = GetWalletByUserId(userId);
            if (wallet == null) throw new Exception("Wallet not found for user.");
            if (!wallet.IsActive) throw new Exception("Wallet is deactivated.");
            if (wallet.Balance < amount) throw new Exception("Insufficient balance.");

            wallet.Balance -= amount;
            wallet.UpdatedAt = DateTime.Now;
            _context.Wallets.Update(wallet);
            Save();

            return wallet;
        }

        public void AddTransaction(Transaction transaction)
        {
            _context.WalletTransactions.Add(transaction);
            Save();
        }

        public IEnumerable<Wallet> GetAllWallets()
        {
            return _context.Wallets.ToList();
        }

        public IQueryable<Transaction> GetAllTransactions()
        {
            return _context.WalletTransactions.AsQueryable();
        }

        public IQueryable<Transaction> GetTransactionsByUserId(int userId)
        {
            return _context.WalletTransactions.Where(t => t.UserId == userId).AsQueryable();
        }

        public IQueryable<Transaction> GetTransactionHistory(int userId)
        {
            return _context.WalletTransactions.Where(t => t.UserId == userId);
        }

        public void ActivateWallet(int walletId)
        {
            var wallet = _context.Wallets.Find(walletId);
            if (wallet == null) throw new Exception("Wallet not found.");
            wallet.IsActive = true;
            wallet.UpdatedAt = DateTime.UtcNow;
            Save();
        }

        public void DeactivateWallet(int walletId)
        {
            var wallet = _context.Wallets.Find(walletId);
            if (wallet == null) throw new Exception("Wallet not found.");
            wallet.IsActive = false;
            wallet.UpdatedAt = DateTime.UtcNow;
            Save();
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
