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
            // Pseudocode plan:
            // 1. Check if Category has a UserId property. If not, add it to the Category model and update the DbContext accordingly.
            // 2. Use the UserId property for filtering instead of the navigation property.
            // 3. If you cannot add UserId, join Categories with Users in the query using EF Core's .Include and .Where.

            // Assuming you add a UserId property to Category:
            var userSub = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var category = _personifiContext
                .Categories
                .SingleOrDefault(c => c.Id == transactionDto.CategoryId);

            // If Category does not have a UserId property, ensure the navigation property is loaded and mapped correctly in the DbContext model configuration.
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