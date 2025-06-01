using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryAPI.Models
{
    [Table("BookDetails")]
    public class BookDetails
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)] // deoarece id este și FK
        public int id { get; set; }

        public string descriere { get; set; } = "";

        public int? anPublicare { get; set; }

        public string gen { get; set; } = "";
    }
}
