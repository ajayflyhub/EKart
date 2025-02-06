using AjayDemoEcart.Models;
using Microsoft.EntityFrameworkCore;

namespace AjayDemoEcart.Data
{
    public class DataContext : DbContext
    {
        private readonly IConfiguration configuration;

        public DataContext(DbContextOptions<DataContext> options, IConfiguration configuration) : base(options)
        {
            this.configuration = configuration;
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Wallet> Wallets { get; set; }
        public DbSet<Transaction> WalletTransactions { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(configuration.GetConnectionString("EKartConnection"));
            base.OnConfiguring(optionsBuilder);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Product Price Configuration
            modelBuilder.Entity<Product>().Property(p => p.Price)
                .HasColumnType("decimal(18,2)");

            // Address to User Relationship Configuration
            modelBuilder.Entity<Address>()
                .HasOne(a => a.User)
                .WithMany()
                .HasForeignKey(a => a.UserId);

            //// Wallet Configuration
            //modelBuilder.Entity<Wallet>(entity =>
            //{
            //    entity.HasKey(w => w.WalletId); // Setting WalletId as the primary key

            //    entity.Property(w => w.Balance)
            //        .HasColumnType("decimal(18,2)")
            //        .IsRequired(); // Setting Balance as required

            //    entity.Property(w => w.UpdatedAt)
            //        .IsRequired(); // Setting UpdatedAt as required

            //    entity.HasOne<User>()
            //        .WithOne()
            //        .HasForeignKey<Wallet>(w => w.UserId) // Establishing the one-to-one relationship with User
            //        .IsRequired(); // Ensuring UserId is required
            //});

            //// Transaction Configuration
            //modelBuilder.Entity<Transaction>(entity =>
            //{
            //    entity.HasKey(t => t.TransactionId); // Setting TransactionId as the primary key

            //    entity.Property(t => t.Amount)
            //        .HasColumnType("decimal(18,2)")
            //        .IsRequired(); // Setting Amount as required

            //    entity.Property(t => t.Type)
            //        .IsRequired(); // Setting Type as required

            //    entity.Property(t => t.Status)
            //        .IsRequired(); // Setting Status as required

            //    entity.Property(t => t.CreatedAt)
            //        .IsRequired(); // Setting CreatedAt as required

            //    entity.Property(t => t.ReferenceId)
            //        .HasMaxLength(50); // Optional: Set the maximum length for ReferenceId
            //});

            // Seed data for Products
            modelBuilder.Entity<Product>().HasData(
         new Product
         {
             Id = 1,
             Name = "Wireless Mouse",
             Description = "Ergonomic wireless mouse with adjustable DPI and 2.4 GHz connectivity.",
             ImageURL = "https://images.unsplash.com/photo-1611532736570-dd6b097ecbb3?q=80&w=1887&auto=format&fit=crop",
             Price = 29.99m,
             Quantity = 150
         },
         new Product
         {
             Id = 2,
             Name = "Bluetooth Headphones",
             Description = "Over-ear Bluetooth headphones with noise cancellation and 20 hours of battery life.",
             ImageURL = "https://images.unsplash.com/photo-1674989844487-722ec77b9b81?q=80&w=1887&auto=format&fit=crop",
             Price = 79.99m,
             Quantity = 80
         },
         new Product
         {
             Id = 3,
             Name = "Yoga Mat",
             Description = "Non-slip yoga mat made of eco-friendly material, 6mm thick.",
             ImageURL = "https://plus.unsplash.com/premium_photo-1675155952889-abb299df1fe7?w=500&auto=format&fit=crop&q=60",
             Price = 19.99m,
             Quantity = 200
         },
         new Product
         {
             Id = 4,
             Name = "Smartwatch",
             Description = "Feature-packed smartwatch with fitness tracking and heart rate monitoring.",
             ImageURL = "https://images.unsplash.com/photo-1598971262973-d694be2402f9?w=800&q=80&fit=crop",
             Price = 129.99m,
             Quantity = 100
         },
         new Product
         {
             Id = 5,
             Name = "Gaming Keyboard",
             Description = "Mechanical gaming keyboard with RGB backlight and customizable keys.",
             ImageURL = "https://images.unsplash.com/photo-1545070915-cbdf5bdaa9a3?w=800&q=80&fit=crop",
             Price = 49.99m,
             Quantity = 120
         },
         new Product
         {
             Id = 6,
             Name = "Portable Charger",
             Description = "10,000mAh power bank with dual USB ports and fast charging support.",
             ImageURL = "https://images.unsplash.com/photo-1611080624812-0a5f93b41716?w=800&q=80&fit=crop",
             Price = 39.99m,
             Quantity = 90
         },
         new Product
         {
             Id = 7,
             Name = "4K Smart TV",
             Description = "65-inch 4K UHD Smart TV with HDR and built-in streaming apps.",
             ImageURL = "https://images.unsplash.com/photo-1600952911946-a0ca5a93b8df?w=800&q=80&fit=crop",
             Price = 999.99m,
             Quantity = 30
         },
         new Product
         {
             Id = 8,
             Name = "Running Shoes",
             Description = "Lightweight running shoes with breathable fabric and superior cushioning.",
             ImageURL = "https://images.unsplash.com/photo-1618354699041-1a70275c876d?w=800&q=80&fit=crop",
             Price = 59.99m,
             Quantity = 180
         },
         new Product
         {
             Id = 9,
             Name = "Electric Kettle",
             Description = "1.7-liter electric kettle with auto shut-off and boil-dry protection.",
             ImageURL = "https://images.unsplash.com/photo-1556911220-e15b29be8c72?w=800&q=80&fit=crop",
             Price = 24.99m,
             Quantity = 110
         },
         new Product
         {
             Id = 10,
             Name = "Desk Lamp",
             Description = "LED desk lamp with adjustable brightness and color temperature.",
             ImageURL = "https://images.unsplash.com/photo-1547658717-2fca7a2b8a81?w=800&q=80&fit=crop",
             Price = 34.99m,
             Quantity = 200
         },
         new Product
         {
             Id = 12,
             Name = "SAMSUNG PHONE",
             Description = "Adjustable stand for smartphones, compatible with most models.",
             ImageURL = "https://images.unsplash.com/photo-1614829946437-bb5e1e7b58e9?w=800&q=80&fit=crop",
             Price = 19.99m,
             Quantity = 250
         });


            modelBuilder.Entity<User>().HasData(
       new User
       {
           Id = 3,
           Username = "Ajaya",
           Email = "ajay.12223@gmail.com",
           PasswordHash = "123456",
           Address = null,
           PhoneNumber = null,
           Role = "customer",
           ResetToken = "i69qsy6ajchi19p4kxmqite7jcky1l",
           ResetTokenExpires = DateTime.Parse("2025-01-21 11:50:27.3150000"),
           IsActive = false
       },
       new User
       {
           Id = 6,
           Username = "AjayBL",
           Email = "ajay1234@gmail.com",
           PasswordHash = null,
           Address = null,
           PhoneNumber = null,
           Role = "customer",
           ResetToken = "6iz9u50zb4doqmgex73mcr7r8mdo3k",
           ResetTokenExpires = DateTime.Parse("2025-01-23 10:15:25.1390000"),
           IsActive = false
       },
       new User
       {
           Id = 7,
           Username = "demouser",
           Email = "demo@dem2o.com",
           PasswordHash = null,
           Address = null,
           PhoneNumber = null,
           Role = "customer",
           ResetToken = "i9j13q8qz7vsclhwdhf1zkektr1cbm",
           ResetTokenExpires = DateTime.Parse("2025-01-23 11:10:05.4130000"),
           IsActive = false
       },
       new User
       {
           Id = 8,
           Username = "AJay",
           Email = "1234@g.com",
           PasswordHash = "$2a$11$xzPQ1ALvl9x6/AeQwejoxOrrHJ7XdK0nPN/TKqfMDshQ9ehMt2aaO",
           Address = null,
           PhoneNumber = null,
           Role = "customer",
           ResetToken = "gobsqho32nmhcbchveyh6tchwvygo6",
           ResetTokenExpires = DateTime.Parse("2025-01-23 11:19:45.5530000"),
           IsActive = true
       },
       new User
       {
           Id = 9,
           Username = "ajaygrt",
           Email = "ajaygrt@gmail.com",
           PasswordHash = "ajaygrt",
           Address = null,
           PhoneNumber = null,
           Role = "customer",
           ResetToken = "13kmka9oxb6xhjh0qxsffc6113b1to",
           ResetTokenExpires = DateTime.Parse("2025-01-23 11:28:58.8830000"),
           IsActive = true
       },
       new User
       {
           Id = 10,
           Username = "ajaygrt1",
           Email = "ajaygrt1@gmail.com",
           PasswordHash = null,
           Address = null,
           PhoneNumber = null,
           Role = "customer",
           ResetToken = "2k3o4xqed1vibgqq4vmgv1mq2pv6ql",
           ResetTokenExpires = DateTime.Parse("2025-01-23 11:30:28.4950000"),
           IsActive = false
       },
       new User
       {
           Id = 11,
           Username = "admin",
           Email = "admin@ekart2.com",
           PasswordHash = "$2a$11$F1tSxVALONcsb5FUfC84lOHVOepsvoGzFBjMQX0MKcS/SiJ20F/P.",
           Address = null,
           PhoneNumber = null,
           Role = "Admin",
           ResetToken = "6n9kljl3qixfuoe4gq1atq6nwanc47",
           ResetTokenExpires = DateTime.Parse("2025-01-23 11:32:57.5280000"),
           IsActive = true
       },
       // Continue adding all other users...
       new User
       {
           Id = 18,
           Username = "ajay456",
           Email = "k123@gmail.com",
           PasswordHash = "$2a$11$hn1qnEEpy2Rf2RdPHXO.HOUADVxgYQLYpgBu3FDT1oA.UD8ENV4Xi",
           Address = "234567",
           PhoneNumber = "1234567333",
           Role = "customer",
           ResetToken = "a344ev0382k45yin8geft33aqgjosn",
           ResetTokenExpires = DateTime.Parse("2025-01-27 13:35:25.2430000"),
           IsActive = true
       }
   );


            // Seed data for Wallets
            //modelBuilder.Entity<Wallet>().HasData(
            //    new Wallet
            //    {
            //        WalletId = 1,
            //        UserId = 1,
            //        Balance = 100.00m
            //    },
            //    new Wallet
            //    {
            //        WalletId = 2,
            //        UserId = 2,
            //        Balance = 50.50m
            //    }
            //);

            // Seed data for Transactions
            //modelBuilder.Entity<Transaction>().HasData(
            //    new Transaction
            //    {
            //        TransactionId = 1,
            //        UserId = 1,
            //        Amount = 50.00m,
            //        Type = "Credit",
            //        Status = "Completed",
            //        CreatedAt = DateTime.UtcNow,
            //        ReferenceId = "TXN123456"
            //    },
            //    new Transaction
            //    {
            //        TransactionId = 2,
            //        UserId = 2,
            //        Amount = 20.00m,
            //        Type = "Debit",
            //        Status = "Pending",
            //        CreatedAt = DateTime.UtcNow,
            //        ReferenceId = "TXN654321"
            //    }
            //);
        }
    }
}
