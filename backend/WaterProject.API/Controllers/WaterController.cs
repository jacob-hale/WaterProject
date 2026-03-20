using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SQLitePCL;
using WaterProject.API.Data;

namespace WaterProject.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class WaterController : ControllerBase
    {
        private WaterDbContext _context;
        public WaterController(WaterDbContext temp)
        {
            _context = temp;
        }

        [HttpGet("AllProjects")]
        public IEnumerable<Project> GetProjects(int pageHowMany)
        {
            var x = _context.Projects.Take(pageHowMany).ToList();
            return x;
        }

        [HttpGet("FunctionalProjects")]
        public IEnumerable<Project> GetFunctionalProjects()
        {
            var x = _context.Projects.Where(p => p.ProjectFunctionalityStatus == "Functional").ToList();
            return x;
        }



    }
}
