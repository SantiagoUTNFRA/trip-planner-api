namespace TripPlanner.Domain.Entities;

public class Trip
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public decimal TotalBudget { get; set; }
    public string BaseCurrency { get; set; } = "NZD";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<Stay> Stays { get; set; } = new List<Stay>();
    public ICollection<Expense> Expenses { get; set; } = new List<Expense>();
}