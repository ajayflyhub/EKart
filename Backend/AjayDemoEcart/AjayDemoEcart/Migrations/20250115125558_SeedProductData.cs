using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AjayDemoEcart.Migrations
{
    /// <inheritdoc />
    public partial class SeedProductData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Description", "ImageURL", "Name", "Price", "Quantity" },
                values: new object[,]
                {
                    { 11, "Ergonomic wireless mouse with a sleek design.", "https://example.com/images/wireless-mouse.jpg", "Wireless Mouse", 25.99m, 100 },
                    { 12, "RGB mechanical gaming keyboard with customizable keys.", "https://example.com/images/gaming-keyboard.jpg", "Gaming Keyboard", 79.99m, 50 },
                    { 13, "Noise-canceling Bluetooth headphones with superior sound quality.", "https://example.com/images/bluetooth-headphones.jpg", "Bluetooth Headphones", 99.99m, 30 },
                    { 14, "Adjustable laptop stand to help reduce neck strain.", "https://example.com/images/laptop-stand.jpg", "Laptop Stand", 19.99m, 200 },
                    { 15, "Fast charging USB-C cable with durable design.", "https://example.com/images/smartphone-charger.jpg", "Smartphone Charger", 9.99m, 150 },
                    { 16, "27-inch 4K UHD monitor with vibrant colors and high resolution.", "https://example.com/images/4k-monitor.jpg", "4K Monitor", 299.99m, 20 },
                    { 17, "1TB external hard drive for secure data storage.", "https://example.com/images/external-hard-drive.jpg", "External Hard Drive", 49.99m, 80 },
                    { 18, "Fitness tracking smartwatch with heart rate monitoring.", "https://example.com/images/smartwatch.jpg", "Smartwatch", 149.99m, 60 },
                    { 19, "Extra-large, smooth surface for gaming precision.", "https://example.com/images/gaming-mousepad.jpg", "Gaming Mousepad", 15.99m, 120 },
                    { 20, "Compact wireless earbuds with crystal clear sound.", "https://example.com/images/wireless-earbuds.jpg", "Wireless Earbuds", 59.99m, 200 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Description", "ImageURL", "Name", "Price", "Quantity" },
                values: new object[,]
                {
                    { 1, "Ergonomic wireless mouse with a sleek design.", "https://example.com/images/wireless-mouse.jpg", "Wireless Mouse", 25.99m, 100 },
                    { 2, "RGB mechanical gaming keyboard with customizable keys.", "https://example.com/images/gaming-keyboard.jpg", "Gaming Keyboard", 79.99m, 50 },
                    { 3, "Noise-canceling Bluetooth headphones with superior sound quality.", "https://example.com/images/bluetooth-headphones.jpg", "Bluetooth Headphones", 99.99m, 30 },
                    { 4, "Adjustable laptop stand to help reduce neck strain.", "https://example.com/images/laptop-stand.jpg", "Laptop Stand", 19.99m, 200 },
                    { 5, "Fast charging USB-C cable with durable design.", "https://example.com/images/smartphone-charger.jpg", "Smartphone Charger", 9.99m, 150 },
                    { 6, "27-inch 4K UHD monitor with vibrant colors and high resolution.", "https://example.com/images/4k-monitor.jpg", "4K Monitor", 299.99m, 20 },
                    { 7, "1TB external hard drive for secure data storage.", "https://example.com/images/external-hard-drive.jpg", "External Hard Drive", 49.99m, 80 },
                    { 8, "Fitness tracking smartwatch with heart rate monitoring.", "https://example.com/images/smartwatch.jpg", "Smartwatch", 149.99m, 60 },
                    { 9, "Extra-large, smooth surface for gaming precision.", "https://example.com/images/gaming-mousepad.jpg", "Gaming Mousepad", 15.99m, 120 },
                    { 10, "Compact wireless earbuds with crystal clear sound.", "https://example.com/images/wireless-earbuds.jpg", "Wireless Earbuds", 59.99m, 200 }
                });
        }
    }
}
