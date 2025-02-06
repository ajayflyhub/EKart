using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AjayDemoEcart.Migrations
{
    /// <inheritdoc />
    public partial class Addone : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ImageURL = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ResetToken = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ResetTokenExpires = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Carts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Carts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Carts_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Addresses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Street = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PostalCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Addresses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Addresses_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ProductIds = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OrderDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    OrderNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ShippingAddress = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BillingAddress = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ContactNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Subtotal = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Taxes = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TotalPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Description", "ImageURL", "Name", "Price", "Quantity" },
                values: new object[,]
                {
                    { 1, "Ergonomic wireless mouse with adjustable DPI and 2.4 GHz connectivity.", "https://images.unsplash.com/photo-1611532736570-dd6b097ecbb3?q=80&w=1887&auto=format&fit=crop", "Wireless Mouse", 29.99m, 150 },
                    { 2, "Over-ear Bluetooth headphones with noise cancellation and 20 hours of battery life.", "https://images.unsplash.com/photo-1674989844487-722ec77b9b81?q=80&w=1887&auto=format&fit=crop", "Bluetooth Headphones", 79.99m, 80 },
                    { 3, "Non-slip yoga mat made of eco-friendly material, 6mm thick.", "https://plus.unsplash.com/premium_photo-1675155952889-abb299df1fe7?w=500&auto=format&fit=crop&q=60", "Yoga Mat", 19.99m, 200 },
                    { 4, "Feature-packed smartwatch with fitness tracking and heart rate monitoring.", "https://images.unsplash.com/photo-1598971262973-d694be2402f9?w=800&q=80&fit=crop", "Smartwatch", 129.99m, 100 },
                    { 5, "Mechanical gaming keyboard with RGB backlight and customizable keys.", "https://images.unsplash.com/photo-1545070915-cbdf5bdaa9a3?w=800&q=80&fit=crop", "Gaming Keyboard", 49.99m, 120 },
                    { 6, "10,000mAh power bank with dual USB ports and fast charging support.", "https://images.unsplash.com/photo-1611080624812-0a5f93b41716?w=800&q=80&fit=crop", "Portable Charger", 39.99m, 90 },
                    { 7, "65-inch 4K UHD Smart TV with HDR and built-in streaming apps.", "https://images.unsplash.com/photo-1600952911946-a0ca5a93b8df?w=800&q=80&fit=crop", "4K Smart TV", 999.99m, 30 },
                    { 8, "Lightweight running shoes with breathable fabric and superior cushioning.", "https://images.unsplash.com/photo-1618354699041-1a70275c876d?w=800&q=80&fit=crop", "Running Shoes", 59.99m, 180 },
                    { 9, "1.7-liter electric kettle with auto shut-off and boil-dry protection.", "https://images.unsplash.com/photo-1556911220-e15b29be8c72?w=800&q=80&fit=crop", "Electric Kettle", 24.99m, 110 },
                    { 10, "LED desk lamp with adjustable brightness and color temperature.", "https://images.unsplash.com/photo-1547658717-2fca7a2b8a81?w=800&q=80&fit=crop", "Desk Lamp", 34.99m, 200 },
                    { 12, "Adjustable stand for smartphones, compatible with most models.", "https://images.unsplash.com/photo-1614829946437-bb5e1e7b58e9?w=800&q=80&fit=crop", "SAMSUNG PHONE", 19.99m, 250 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Addresses_UserId",
                table: "Addresses",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Carts_ProductId",
                table: "Carts",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UserId",
                table: "Orders",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Addresses");

            migrationBuilder.DropTable(
                name: "Carts");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
