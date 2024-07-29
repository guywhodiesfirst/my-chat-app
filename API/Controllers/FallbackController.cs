using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    // Used for handling requests that do not match any other root in the app
    public class FallbackController : Controller
    {
        public IActionResult Index() 
        {
            return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html"), "text/HTML");
        }
    }
}