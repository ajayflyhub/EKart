using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AjayDemoEcart.Migrations
{
    /// <inheritdoc />
    public partial class AddProductsBack : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 12);
        }
    }
}
