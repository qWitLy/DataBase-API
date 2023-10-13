using Microsoft.EntityFrameworkCore;

namespace WebApplication9
{
    internal class ApplicationContext : DbContext
    {
        public DbSet<User> Users { get; set; } = null!;
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
                new User { Id = Guid.NewGuid().ToString(), Name = "Tom", Age = 23 },
                new User { Id = Guid.NewGuid().ToString(), Name = "Kent", Age = 22 },
                new User { Id = Guid.NewGuid().ToString(), Name = "Nekent", Age = 24 }
                ); ;
        }

    }
}
