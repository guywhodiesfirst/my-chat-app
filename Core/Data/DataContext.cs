using Core.Entitites;
using Microsoft.EntityFrameworkCore;

namespace Core.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Message> Messages { get; set; }
        public DataContext(DbContextOptions options) : base(options)
        {
            
        }
    }
}