namespace TripPlanner.Domain.Entities;

public class Stay
{
    public Guid Id { get; set; }
    public string City { get; set; } = string.Empty;
    public DateTime EntryDate { get; set; }
    public DateTime? ExitDate { get; set; }

    public Guid TripId { get; set; }
    public Trip Trip { get; set; } = null!;

    public Guid CountryId { get; set; }
    public Country Country { get; set; } = null!;

    public ICollection<Expense> Expenses { get; set; } = new List<Expense>();
}