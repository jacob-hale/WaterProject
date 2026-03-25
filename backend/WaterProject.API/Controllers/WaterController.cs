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
        public ProjectListData GetProjects(int pageSize = 10, int pageNum = 1, [FromQuery] List<string>? projectTypes = null)
        {
            var query = _context.Projects.AsQueryable();

            if (projectTypes != null && projectTypes.Any())
            {
                query = query.Where(p => projectTypes.Contains(p.ProjectType));
            }

            var totalNumProjects = query.Count();

            var x = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            ProjectListData blah = new ProjectListData
            {
                Projects = x,
                TotalNumProjects = totalNumProjects
            };
            return blah;
        }

        [HttpGet("GetProjectTypes")]
        public IActionResult GetProjectTypes()
        {
            var projectTypes = _context.Projects
                .Select(p => p.ProjectType)
                .Distinct()
                .ToList();
            return Ok(projectTypes);
        }



    }
}
