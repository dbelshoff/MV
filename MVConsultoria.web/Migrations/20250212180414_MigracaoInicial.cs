using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MVConsultoria.Web.Migrations
{
    /// <inheritdoc />
    public partial class MigracaoInicial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "LimiteDisponivel",
                table: "Users",
                type: "double",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)",
                oldNullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "LimiteDeCredito",
                table: "Users",
                type: "double",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)",
                oldNullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "ValorPago",
                table: "Parcelas",
                type: "double",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<double>(
                name: "Valor",
                table: "Parcelas",
                type: "double",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<double>(
                name: "ValorTotal",
                table: "Compras",
                type: "double",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "LimiteDisponivel",
                table: "Users",
                type: "decimal(18,2)",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "double",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "LimiteDeCredito",
                table: "Users",
                type: "decimal(18,2)",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "double",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "ValorPago",
                table: "Parcelas",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double");

            migrationBuilder.AlterColumn<decimal>(
                name: "Valor",
                table: "Parcelas",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double");

            migrationBuilder.AlterColumn<decimal>(
                name: "ValorTotal",
                table: "Compras",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double");
        }
    }
}
