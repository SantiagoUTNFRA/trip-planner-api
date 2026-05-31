namespace TripPlanner.Domain.Entities;

public class Expense
{
    public Guid Id { get; set; }
    public decimal Amount { get; set; }
    public string Currency { get; set; } = string.Empty;
    public decimal AmountInBaseCurrency { get; set; }
    public ExpenseCategory Category { get; set; }
    public string? Notes { get; set; }
    public DateTime Date { get; set; }

    public Guid TripId { get; set; }
    public Trip Trip { get; set; } = null!;

    public Guid? StayId { get; set; }
    public Stay? Stay { get; set; }
}

public enum ExpenseCategory
{
    Accommodation,
    Food,
    Transport,
    Activities,
    Gear,
    Health,
    Visa,
    Other
}