using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LibraryAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedLibrarianModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Librarians",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Username",
                table: "Librarians",
                newName: "parola");

            migrationBuilder.RenameColumn(
                name: "Password",
                table: "Librarians",
                newName: "nume");

            migrationBuilder.AddColumn<string>(
                name: "email",
                table: "Librarians",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "email",
                table: "Librarians");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Librarians",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "parola",
                table: "Librarians",
                newName: "Username");

            migrationBuilder.RenameColumn(
                name: "nume",
                table: "Librarians",
                newName: "Password");
        }
    }
}
