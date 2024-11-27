public class UserDto
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public string CPF { get; set; }
    public string Email { get; set; }
    public string Tipo { get; set; } // Administrador ou Usuario
    public bool Bloqueado { get; set; }
}
