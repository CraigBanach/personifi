using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using personifi_backend.Models;

namespace personifi_backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ILogger<TransactionController> _logger;
        private readonly PersonifiContext _personifiContext;

        public TransactionController(ILogger<TransactionController> logger, PersonifiContext personifiContext)
        {
            _logger = logger;
            _personifiContext = personifiContext;
        }

        [HttpPost]
        [Authorize("transaction:create")]
        public async Task<IActionResult> PostTransaction([FromBody] TransactionDto transactionDto)
        {
            var transaction = await _personifiContext.Transactions.FirstOrDefaultAsync();
            if (transaction == null)
            {
                return BadRequest("Unable to create transaction.");
            }
            return Ok(transaction);
        }
    }
}