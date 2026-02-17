using Microsoft.EntityFrameworkCore;
using backend.model; 

namespace backend.data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Post> Posts => Set<Post>();
    }
}
