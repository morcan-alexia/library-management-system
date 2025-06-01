using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LibraryAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddBorrowCountToBook : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "BookId",
                table: "BookDetails");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Loans",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "ReturnDate",
                table: "Loans",
                newName: "dataReturnare");

            migrationBuilder.RenameColumn(
                name: "LoanDate",
                table: "Loans",
                newName: "dataImprumut");

            migrationBuilder.RenameColumn(
                name: "ClientId",
                table: "Loans",
                newName: "idClient");

            migrationBuilder.RenameColumn(
                name: "BookId",
                table: "Loans",
                newName: "idBook");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Clients",
                newName: "email");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Clients",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Password",
                table: "Clients",
                newName: "telefon");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "Clients",
                newName: "parola");

            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "Clients",
                newName: "nume");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Books",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Books",
                newName: "titlu");

            migrationBuilder.RenameColumn(
                name: "Author",
                table: "Books",
                newName: "categorie");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "BookDetails",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "ISBN",
                table: "BookDetails",
                newName: "gen");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "BookDetails",
                newName: "descriere");

            migrationBuilder.AddColumn<string>(
                name: "autor",
                table: "Books",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "disponibil",
                table: "Books",
                type: "bit",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "id",
                table: "BookDetails",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "anPublicare",
                table: "BookDetails",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "autor",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "disponibil",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "anPublicare",
                table: "BookDetails");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Loans",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "idClient",
                table: "Loans",
                newName: "ClientId");

            migrationBuilder.RenameColumn(
                name: "idBook",
                table: "Loans",
                newName: "BookId");

            migrationBuilder.RenameColumn(
                name: "dataReturnare",
                table: "Loans",
                newName: "ReturnDate");

            migrationBuilder.RenameColumn(
                name: "dataImprumut",
                table: "Loans",
                newName: "LoanDate");

            migrationBuilder.RenameColumn(
                name: "email",
                table: "Clients",
                newName: "Email");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Clients",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "telefon",
                table: "Clients",
                newName: "Password");

            migrationBuilder.RenameColumn(
                name: "parola",
                table: "Clients",
                newName: "LastName");

            migrationBuilder.RenameColumn(
                name: "nume",
                table: "Clients",
                newName: "FirstName");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Books",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "titlu",
                table: "Books",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "categorie",
                table: "Books",
                newName: "Author");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "BookDetails",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "gen",
                table: "BookDetails",
                newName: "ISBN");

            migrationBuilder.RenameColumn(
                name: "descriere",
                table: "BookDetails",
                newName: "Description");

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "Books",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "BookDetails",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "BookId",
                table: "BookDetails",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
