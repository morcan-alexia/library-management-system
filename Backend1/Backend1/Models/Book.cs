using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryAPI.Models
{
    [Table("Books")]
    public class Book
    {
        public int id { get; set; }

        public string titlu { get; set; } = "";

        public string autor { get; set; } = "";

        public string categorie { get; set; } = "";

        public bool? disponibil { get; set; }

        
    }
}

