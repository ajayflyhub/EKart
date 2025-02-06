using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AjayDemoEcart.Migrations
{
    /// <inheritdoc />
    public partial class AddUsers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Address", "Email", "IsActive", "PasswordHash", "PhoneNumber", "ResetToken", "ResetTokenExpires", "Role", "Username" },
                values: new object[,]
                {
                    { 3, null, "ajay.12223@gmail.com", false, "123456", null, "i69qsy6ajchi19p4kxmqite7jcky1l", new DateTime(2025, 1, 21, 11, 50, 27, 315, DateTimeKind.Unspecified), "customer", "Ajaya" },
                    { 6, null, "ajay1234@gmail.com", false, null, null, "6iz9u50zb4doqmgex73mcr7r8mdo3k", new DateTime(2025, 1, 23, 10, 15, 25, 139, DateTimeKind.Unspecified), "customer", "AjayBL" },
                    { 7, null, "demo@dem2o.com", false, null, null, "i9j13q8qz7vsclhwdhf1zkektr1cbm", new DateTime(2025, 1, 23, 11, 10, 5, 413, DateTimeKind.Unspecified), "customer", "demouser" },
                    { 8, null, "1234@g.com", true, "$2a$11$xzPQ1ALvl9x6/AeQwejoxOrrHJ7XdK0nPN/TKqfMDshQ9ehMt2aaO", null, "gobsqho32nmhcbchveyh6tchwvygo6", new DateTime(2025, 1, 23, 11, 19, 45, 553, DateTimeKind.Unspecified), "customer", "AJay" },
                    { 9, null, "ajaygrt@gmail.com", true, "ajaygrt", null, "13kmka9oxb6xhjh0qxsffc6113b1to", new DateTime(2025, 1, 23, 11, 28, 58, 883, DateTimeKind.Unspecified), "customer", "ajaygrt" },
                    { 10, null, "ajaygrt1@gmail.com", false, null, null, "2k3o4xqed1vibgqq4vmgv1mq2pv6ql", new DateTime(2025, 1, 23, 11, 30, 28, 495, DateTimeKind.Unspecified), "customer", "ajaygrt1" },
                    { 11, null, "admin@ekart2.com", true, "$2a$11$F1tSxVALONcsb5FUfC84lOHVOepsvoGzFBjMQX0MKcS/SiJ20F/P.", null, "6n9kljl3qixfuoe4gq1atq6nwanc47", new DateTime(2025, 1, 23, 11, 32, 57, 528, DateTimeKind.Unspecified), "Admin", "admin" },
                    { 18, "234567", "k123@gmail.com", true, "$2a$11$hn1qnEEpy2Rf2RdPHXO.HOUADVxgYQLYpgBu3FDT1oA.UD8ENV4Xi", "1234567333", "a344ev0382k45yin8geft33aqgjosn", new DateTime(2025, 1, 27, 13, 35, 25, 243, DateTimeKind.Unspecified), "customer", "ajay456" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 18);
        }
    }
}
