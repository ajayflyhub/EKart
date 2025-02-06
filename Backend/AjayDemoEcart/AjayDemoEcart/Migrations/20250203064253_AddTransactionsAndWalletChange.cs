using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AjayDemoEcart.Migrations
{
    /// <inheritdoc />
    public partial class AddTransactionsAndWalletChange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WalletTransactions_Wallets_WalletId",
                table: "WalletTransactions");

            migrationBuilder.DropIndex(
                name: "IX_WalletTransactions_WalletId",
                table: "WalletTransactions");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "WalletTransactions");

            migrationBuilder.RenameColumn(
                name: "WalletId",
                table: "WalletTransactions",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "TransactionType",
                table: "WalletTransactions",
                newName: "Type");

            migrationBuilder.RenameColumn(
                name: "TransactionDate",
                table: "WalletTransactions",
                newName: "CreatedAt");

            migrationBuilder.AddColumn<string>(
                name: "ReferenceId",
                table: "WalletTransactions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "WalletTransactions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReferenceId",
                table: "WalletTransactions");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "WalletTransactions");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "WalletTransactions",
                newName: "WalletId");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "WalletTransactions",
                newName: "TransactionType");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "WalletTransactions",
                newName: "TransactionDate");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "WalletTransactions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_WalletTransactions_WalletId",
                table: "WalletTransactions",
                column: "WalletId");

            migrationBuilder.AddForeignKey(
                name: "FK_WalletTransactions_Wallets_WalletId",
                table: "WalletTransactions",
                column: "WalletId",
                principalTable: "Wallets",
                principalColumn: "WalletId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
