using Microsoft.EntityFrameworkCore;
using System.Data.Common;

namespace WaterProject.API.Data
{
    public class WaterDbContext : DbContext
    {
        public WaterDbContext(DbContextOptions<WaterDbContext> options) : base(options)
        {
        }

        public DbSet<Project> Projects { get; set; }

    }
}
