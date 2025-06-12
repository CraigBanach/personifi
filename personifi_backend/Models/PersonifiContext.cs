using Microsoft.EntityFrameworkCore;

namespace personifi_backend.Models
{
    public class PersonifiContext : DbContext
    {
        private readonly IConfiguration _config;

        public PersonifiContext(IConfiguration config)
        {
            _config = config;
        }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<User> Users { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
           => optionsBuilder
            .UseNpgsql($"Host=aws-0-eu-west-2.pooler.supabase.com;Username=postgres.zupyvtzqkqipauwefzqd;Password={_config["PostgresPassword"]};Database=postgres")
            .UseSeeding((context, _) =>
            {
                var testUser = context.Set<User>().FirstOrDefault(u => u.Sub == "google-oauth2|114831037037369295773");
                if (testUser == null)
                {
                    testUser = new User { Sub = "google-oauth2|114831037037369295773" };
                    context.Set<User>().Add(testUser);
                    context.SaveChanges();
                }
                var testCategory = context.Set<Category>().FirstOrDefault(c => c.Name == "Housing");
                if (testCategory == null)
                {
                    testCategory = new Category
                    {
                        User = testUser,
                        Name = "Housing",
                        CategoryType = CategoryType.Debit
                    };
                    context.Set<Category>().Add(testCategory);
                    context.SaveChanges();
                }
                var testTransaction = context.Set<Transaction>().FirstOrDefault(t => t.Description == "Mortgage");
                if (testTransaction == null)
                {
                    testTransaction = new Transaction
                    {
                        Category = testCategory,
                        Amount = 1000.00m,
                        TransactionType = TransactionType.Expense,
                        Description = "Mortgage",
                        Notes = "Monthly mortgage payment",
                        TransactionDate = DateTime.UtcNow
                    };
                    context.Set<Transaction>().Add(testTransaction);
                    context.SaveChanges();
                }
            });
    }
}
