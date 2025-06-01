using LibraryAPI.Data;
using LibraryAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookDetailsController : ControllerBase
    {
        private readonly LibraryContext _context;

        public BookDetailsController(LibraryContext context)
        {
            _context = context;
        }

        // GET: api/bookdetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookDetails>>> GetAll()
        {
            return await _context.BookDetails.ToListAsync();
        }

        // GET: api/bookdetails/1
        [HttpGet("{id}")]
        public async Task<ActionResult<BookDetails>> GetById(int id)
        {
            var details = await _context.BookDetails.FindAsync(id);
            if (details == null)
                return NotFound();

            return details;
        }

        // POST: api/bookdetails
        [HttpPost]
        public async Task<ActionResult<BookDetails>> AddDetails(BookDetails details)
        {
            _context.BookDetails.Add(details);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = details.id }, details);
        }

        // PUT: api/bookdetails/1
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDetails(int id, BookDetails updated)
        {
            if (id != updated.id)
                return BadRequest();

            _context.Entry(updated).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/bookdetails/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var details = await _context.BookDetails.FindAsync(id);
            if (details == null)
                return NotFound();

            _context.BookDetails.Remove(details);
            await _context.SaveChangesAsync();
            return NoContent();
        }

    }
}

