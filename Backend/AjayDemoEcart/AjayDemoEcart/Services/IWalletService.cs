using AjayDemoEcart.Models;
using AjayDemoEcart.Repositories;
using System;
using System.Linq;

namespace AjayDemoEcart.Services
{
    public class WalletService : IWalletServiceInterface
    {
        private readonly IWalletRepositoryInterface _walletRepository;
        private readonly IWalletRepositoryInterface _walletTransactionRepository;

        public WalletService(IWalletRepositoryInterface walletRepository, IWalletRepositoryInterface walletTransactionRepository)
        {
            _walletRepository = walletRepository;
            _walletTransactionRepository = walletTransactionRepository;
        }

        public IEnumerable<Wallet> GetAllWallets()
        {
            return _walletRepository.GetAllWallets();
        }

        public IQueryable<Transaction> GetAllTransactions()
        {
            return _walletRepository.GetAllTransactions();
        }

        public IQueryable<Transaction> GetTransactionsByUserId(int userId)
        {
            return _walletRepository.GetTransactionsByUserId(userId);
        }

        public Wallet CreateWallet(int userId)
        {
            return _walletRepository.CreateWallet(userId);
        }

        public Wallet GetWalletByUserId(int userId)
        {
            return _walletRepository.GetWalletByUserId(userId);
        }

        public Wallet LoadMoneyToWallet(int userId, decimal amount)
        {
            return _walletRepository.AddMoneyToWallet(userId, amount);
        }

        public Wallet DeductMoneyFromWallet(int userId, decimal amount)
        {
            return _walletRepository.DeductMoneyFromWallet(userId, amount);
        }

        public IQueryable<Transaction> GetTransactionHistory(int userId)
        {
            return _walletRepository.GetTransactionHistory(userId);
        }

        public void AddTransaction(Transaction transaction)
        {
            _walletTransactionRepository.AddTransaction(transaction);
        }

        public void ActivateWallet(int walletId)
        {
            _walletRepository.ActivateWallet(walletId);
        }

        public void DeactivateWallet(int walletId)
        {
            _walletRepository.DeactivateWallet(walletId);
        }
    }
}
