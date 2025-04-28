using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace personifi_backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    // Dashboard controller is a crappy name, but until this is more fleshed out, we can
    // tigthly couple the controller to the dashboard
    public class DashboardController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;

        public DashboardController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet("balance")]
        [Authorize("read:balances")]
        public IActionResult Get()
        {
            if (User.Identity?.Name == null)
            {
                return Unauthorized();
            }

            return Ok(new
            {
                total = new
                {
                    balance = 12546,
                    change = 1234
                },
                income = new
                {
                    balance = 4395,
                    change = 2.5
                },
                expense = new
                {
                    balance = 2860,
                    change = 4.1
                },
                saving = new
                {
                    balance = 34.9,
                    change = 5.2
                }
            });
        }
    }
}
