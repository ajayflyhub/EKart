using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AjayDemoEcart.Migrations
{
    /// <inheritdoc />
    public partial class IncludeProductInCart : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "Carts");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Carts",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddForeignKey(
                name: "FK_Carts_Products_Id",
                table: "Carts",
                column: "Id",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Carts_Products_Id",
                table: "Carts");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Carts",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "Carts",
                type: "int",
                nullable: false,
                defaultValue: 0);

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
    }
}
