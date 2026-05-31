namespace TripPlanner.Domain.Entities;

public class Country
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty; // ej: TH, VN, ID
    public string CurrencyCode { get; set; } = string.Empty; // ej: THB, VND
    public string CurrencyName { get; set; } = string.Empty;
    public int VisaDaysAllowed { get; set; }
    public string VisaType { get; set; } = string.Empty; // ej: "Visa on arrival", "Free"

    public ICollection<Stay> Stays { get; set; } = new List<Stay>();
    public ICollection<VisaEntry> VisaEntries { get; set; } = new List<VisaEntry>();
}