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

        [HttpPost("AddProject")]
        public IActionResult AddProject([FromBody] Project newProject)
        {
            _context.Projects.Add(newProject);
            _context.SaveChanges();
            return Ok();
        }


        [HttpPut("UpdateProject/{id}")]
        public IActionResult UpdateProject(int id, [FromBody] Project updatedProject)
        {
            var existingProject = _context.Projects.Find(id);
            if (existingProject == null)
            {
                return NotFound();
            }

            existingProject.ProjectName = updatedProject.ProjectName;
            existingProject.ProjectType = updatedProject.ProjectType;
            existingProject.ProjectRegionalProgram = updatedProject.ProjectRegionalProgram;
            existingProject.ProjectImpact = updatedProject.ProjectImpact;
            existingProject.ProjectPhase = updatedProject.ProjectPhase;
            existingProject.ProjectFunctionalityStatus = updatedProject.ProjectFunctionalityStatus;

            _context.Projects.Update(existingProject);
            _context.SaveChanges();
            return Ok(existingProject);
        }

        [HttpDelete("DeleteProject/{id}")]
        public IActionResult DeleteProject(int id)
        {
            var existingProject = _context.Projects.Find(id);
            if (existingProject == null)
            {
                return NotFound(new { message = "Project not found" });
            }

            _context.Projects.Remove(existingProject);
            _context.SaveChanges();
            return NoContent();
        }

    }
}
