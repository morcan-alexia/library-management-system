/*using LibraryAPI.Data;
using LibraryAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LibrariansController : ControllerBase
    {
        private readonly LibraryContext _context;

        public LibrariansController(LibraryContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<ActionResult<Librarian>> Login([FromBody] LoginRequest login)
        {
            var librarian = await _context.Librarians
                .FirstOrDefaultAsync(l => l.email == login.email && l.parola == login.parola);

            if (librarian == null)
                return Unauthorized("Email sau parolă incorectă.");

            return Ok(librarian);
        }

        public class LoginRequest
        {
            public string email { get; set; } = "";
            public string parola { get; set; } = "";
        }

        // POST: api/librarians
        [HttpPost]
        public async Task<ActionResult<Librarian>> CreateLibrarian(Librarian librarian)
        {
            _context.Librarians.Add(librarian);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(CreateLibrarian), new { id = librarian.id }, librarian);
        }
    }

    public class LoginRequest
    {
        public string email { get; set; } = "";
        public string parola { get; set; } = "";
    }
}*/

using LibraryAPI.Data;
using LibraryAPI.Models;
using LibraryAPI.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LibrariansController : ControllerBase
    {
        private readonly LibraryContext _context;

        public LibrariansController(LibraryContext context)
        {
            _context = context;
        }

        // POST: api/librarians/login
        [HttpPost("login")]
        public async Task<ActionResult<Librarian>> Login([FromBody] LoginRequest login)
        {
            var librarian = await _context.Librarians
                .FirstOrDefaultAsync(l => l.email == login.email && l.parola == login.parola);

            if (librarian == null)
                return Unauthorized("Email sau parolă incorectă.");

            return Ok(librarian);
        }

        // POST: api/librarians
        [HttpPost]
        public async Task<ActionResult<Librarian>> CreateLibrarian([FromBody] LibraryAPI.DTOs.LibrarianRegisterRequest request)

        {
            const string CodCorect = "BOOKLY2025"; // cod de acces prestabilit

            if (request.CodAcces != CodCorect)
                return Unauthorized("Cod de acces invalid.");

            var librarian = new Librarian
            {
                nume = request.Nume,
                email = request.Email,
                parola = request.Parola
            };

            _context.Librarians.Add(librarian);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CreateLibrarian), new { id = librarian.id }, librarian);
        }
    }
}


