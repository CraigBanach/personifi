using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;

namespace personifi_backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ILogger<TransactionController> _logger;

        public TransactionController(ILogger<TransactionController> logger)
        {
            _logger = logger;
        }
    }

    [HttpPost]
        [Authorize("transaction:create")]
        public Task<IActionResult<Transaction>> PostTransaction(CreateTransactionDto transactionDto)
        {

        }
    }