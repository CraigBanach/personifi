namespace personifi_backend.Models
{
    public class Category
    {
        public int Id { get; set; }
        public required User User { get; set; }
        public required string Name { get; set; }
        public CategoryType CategoryType { get; set; }
    }
}
