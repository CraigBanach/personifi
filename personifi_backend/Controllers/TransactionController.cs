using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using personifi_backend.Models;
using System.Security.Claims;

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
            var userSub = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var category = _personifiContext
                .Categories
                .SingleOrDefault(c => c.Id == transactionDto.CategoryId);

            if (category == null)
            {
                _logger.LogWarning("Category with ID {CategoryId} not found for user {UserId}.",
                    transactionDto.CategoryId, User?.FindFirst("sub")?.Value);
                return BadRequest("Category not found.");
            }

            var transaction = new Transaction
            {
                Category = category,
                Amount = transactionDto.Amount,
                TransactionType = transactionDto.TransactionType,
                Description = transactionDto.Description,
                Notes = transactionDto.Notes,
                TransactionDate = transactionDto.TransactionDate
            };

            try
            {
                await _personifiContext.AddAsync(transaction);
                await _personifiContext.SaveChangesAsync();
                _logger.LogInformation("Created a new transaction {TransactionId} - {TransactionDescription} with category {categoryName}.",
                    transaction.Id, transaction.Description, transaction.Category.Name);
            }
            catch
            {
                _logger.LogError("Failed to create transaction for user {UserId} with category {CategoryId}.",
                    User?.FindFirst("sub")?.Value, transactionDto.CategoryId);
                return BadRequest("Unable to create transaction.");
            }
            return Ok(transaction);
        }
    }
}