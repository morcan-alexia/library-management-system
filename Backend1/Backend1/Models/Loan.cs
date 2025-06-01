using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryAPI.Models
{
    [Table("Loans")]
    public class Loan
    {
        public int id { get; set; }

        public int idClient { get; set; }

        public int idBook { get; set; }

        public DateTime dataImprumut { get; set; }

        public DateTime? dataReturnare { get; set; } // poate fi null
    }
}

