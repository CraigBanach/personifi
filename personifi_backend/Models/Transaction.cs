namespace personifi_backend.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public required Category Category { get; set; }
        public decimal Amount { get; set; }
        public TransactionType TransactionType { get; set; }
        public required string Description { get; set; }
        public string? Notes { get; set; }
        public DateTime TransactionDate { get; set; }
    }
}