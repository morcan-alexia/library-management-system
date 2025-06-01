using LibraryAPI.Data;
using LibraryAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoansController : ControllerBase
    {
        private readonly LibraryContext _context;

        public LoansController(LibraryContext context)
        {
            _context = context;
        }

        // GET: api/loans
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Loan>>> GetLoans()
        {
            return await _context.Loans.ToListAsync();
        }

        // GET: api/loans/by-client/5
        [HttpGet("by-client/{clientId}")]
        public async Task<ActionResult<IEnumerable<Loan>>> GetLoansByClient(int clientId)
        {
            return await _context.Loans
                .Where(l => l.idClient == clientId)
                .ToListAsync();
        }

        // POST: api/loans
        [HttpPost]
        public async Task<ActionResult<Loan>> CreateLoan(Loan loan)
        {
            loan.dataImprumut = DateTime.Now;

            // Setează cartea ca indisponibilă
            var carte = await _context.Books.FindAsync(loan.idBook);
            if (carte != null)
            {
                carte.disponibil = false;
            }

            _context.Loans.Add(loan);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLoans), new { id = loan.id }, loan);
        }


        // PUT: api/loans/return/5
        [HttpPut("return/{id}")]
        public async Task<IActionResult> ReturnLoan(int id)
        {
            var loan = await _context.Loans.FindAsync(id);
            if (loan == null)
                return NotFound();

            loan.dataReturnare = DateTime.Now;

            var book = await _context.Books.FindAsync(loan.idBook);
            if (book != null)
            {
                book.disponibil = true;
            }

            await _context.SaveChangesAsync();
            return NoContent();
        }


        // DELETE: api/loans/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLoan(int id)
        {
            var loan = await _context.Loans.FindAsync(id);
            if (loan == null)
                return NotFound();

            _context.Loans.Remove(loan);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}


