using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using personifi_backend.Models;

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

        [HttpPost]
        [Authorize("transaction:create")]
        public Task<IActionResult> PostTransaction([FromBody] TransactionDto transactionDto)
        {
            throw new NotImplementedException();
        }
    }
}