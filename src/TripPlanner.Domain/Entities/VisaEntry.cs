namespace TripPlanner.Domain.Entities;

public class VisaEntry
{
    public Guid Id { get; set; }
    public DateTime EntryDate { get; set; }
    public DateTime? ExitDate { get; set; }
    public string VisaType { get; set; } = string.Empty;

    public Guid TripId { get; set; }
    public Trip Trip { get; set; } = null!;

    public Guid CountryId { get; set; }
    public Country Country { get; set; } = null!;

    public int DaysUsed => ExitDate.HasValue
        ? (ExitDate.Value - EntryDate).Days
        : (DateTime.UtcNow - EntryDate).Days;

    public int DaysRemaining(int daysAllowed) => daysAllowed - DaysUsed;
}