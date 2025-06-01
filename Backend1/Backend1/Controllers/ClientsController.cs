using LibraryAPI.Data;
using LibraryAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientsController : ControllerBase
    {
        private readonly LibraryContext _context;

        public ClientsController(LibraryContext context)
        {
            _context = context;
        }

        // GET: api/clients
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Client>>> GetClients()
        {
            return await _context.Clients.ToListAsync();
        }

        // GET: api/clients/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Client>> GetClient(int id)
        {
            var client = await _context.Clients.FindAsync(id);
            if (client == null)
                return NotFound();

            return client;
        }

        // POST: api/clients
         [HttpPost]
         public async Task<ActionResult<Client>> AddClient(Client client)
         {
             _context.Clients.Add(client);
             await _context.SaveChangesAsync();
             return CreatedAtAction(nameof(GetClient), new { id = client.id }, client);
         }


        [HttpPost("login")]
        public async Task<ActionResult<Client>> LoginClient([FromBody] LoginRequest login)
        {
            var email = login.email?.Trim().ToLower();
            var parola = login.parola?.Trim();

            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(parola))
                return BadRequest("Email și parola sunt obligatorii.");

            var client = await _context.Clients
                .FirstOrDefaultAsync(c => c.email.ToLower() == email && c.parola == parola);

            if (client == null)
                return Unauthorized("Email sau parolă greșită.");

            return Ok(client);
        }




        // PUT: api/clients/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateClient(int id, Client updated)
        {
            if (id != updated.id)
                return BadRequest();

            _context.Entry(updated).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/clients/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClient(int id)
        {
            var client = await _context.Clients.FindAsync(id);
            if (client == null)
                return NotFound();

            _context.Clients.Remove(client);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
public class LoginRequest
{
    public string email { get; set; }
    public string parola { get; set; }
}

