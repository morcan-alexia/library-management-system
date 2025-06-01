using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryAPI.Models
{
    [Table("Librarians")]
    public class Librarian
    {
        public int id { get; set; }

        public string nume { get; set; } = "";

        public string email { get; set; } = "";

        public string parola { get; set; } = "";
    }
}

