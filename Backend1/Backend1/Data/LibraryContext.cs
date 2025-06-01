using Microsoft.EntityFrameworkCore;
using LibraryAPI.Models;
using System.Collections.Generic;

namespace LibraryAPI.Data
{
    public class LibraryContext : DbContext
    {
        public LibraryContext(DbContextOptions<LibraryContext> options) : base(options) { }

        public DbSet<Book> Books { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Librarian> Librarians { get; set; }
        public DbSet<Loan> Loans { get; set; }
        public DbSet<BookDetails> BookDetails { get; set; }
    }
}

