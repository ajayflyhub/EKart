using AjayDemoEcart.Services;
using AjayDemoEcart.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace AjayDemoEcart.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WalletController : ControllerBase
    {
        private readonly IWalletServiceInterface _walletService;

        public WalletController(IWalletServiceInterface walletService)
        {
            _walletService = walletService;
        }

        [HttpPost("create/{userId}")]
        public ActionResult<Wallet> CreateWallet(int userId)
        {
            try
            {
                var wallet = _walletService.CreateWallet(userId);
                return CreatedAtAction(nameof(GetWallet), new { userId = wallet.UserId }, wallet);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("all")]
        [Authorize(Roles = "Admin")]
        public ActionResult<IEnumerable<Wallet>> GetAllWallets()
        {
            try
            {
                var wallets = _walletService.GetAllWallets();
                return Ok(wallets);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{userId}")]
        [Authorize]
        public ActionResult<Wallet> GetWallet(int userId)
        {
            try
            {
                var wallet = _walletService.GetWalletByUserId(userId);
                return Ok(wallet);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost("load")]
        [Authorize]
        public ActionResult<Wallet> LoadMoney([FromBody] LoadMoneyRequest request)
        {
            if (request.Amount <= 0) return BadRequest("Amount must be greater than zero.");

            try
            {
                var wallet = _walletService.LoadMoneyToWallet(request.UserId, request.Amount);
                var transaction = new Transaction
                {
                    UserId = request.UserId,
                    Amount = request.Amount,
                    Type = "Load",
                    Status = "Success",
                    CreatedAt = DateTime.UtcNow,
                    ReferenceId = Guid.NewGuid().ToString()
                };

                _walletService.AddTransaction(transaction);

                return Ok(wallet);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("deduct")]
        [Authorize]
        public ActionResult<Wallet> DeductMoney([FromBody] LoadMoneyRequest request)
        {
            if (request.Amount <= 0) return BadRequest("Amount must be greater than zero.");

            try
            {
                var wallet = _walletService.DeductMoneyFromWallet(request.UserId, request.Amount);

                var transaction = new Transaction
                {
                    UserId = request.UserId,
                    Amount = request.Amount,
                    Type = "Deduct",
                    Status = "Success",
                    CreatedAt = DateTime.UtcNow, 
                    ReferenceId = Guid.NewGuid().ToString() 
                };

                _walletService.AddTransaction(transaction);

                return Ok(wallet);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet("transactions")]
        [Authorize]
        public ActionResult<IEnumerable<Transaction>> GetAllTransactions()
        {
            try
            {
                var transactions = _walletService.GetAllTransactions();
                return Ok(transactions);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("transactions/{userId}")]
        [Authorize]
        public ActionResult<IEnumerable<Transaction>> GetTransactionsByUserId(int userId)
        {
            try
            {
                var transactions = _walletService.GetTransactionsByUserId(userId);
                if (transactions == null || !transactions.Any())
                {
                    return NotFound("No transactions found for this user.");
                }

                return Ok(transactions);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("activate/{walletId}")]
        [Authorize]
        public IActionResult ActivateWallet(int walletId)
        {
            try
            {
                _walletService.ActivateWallet(walletId);
                return Ok("Wallet activated successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("deactivate/{walletId}")]
        [Authorize]
        public IActionResult DeactivateWallet(int walletId)
        {
            try
            {
                _walletService.DeactivateWallet(walletId);
                return Ok("Wallet deactivated successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
