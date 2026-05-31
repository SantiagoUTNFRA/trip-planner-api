using Microsoft.EntityFrameworkCore;
using TripPlanner.Domain.Entities;

namespace TripPlanner.Application.Common.Interfaces;

public interface ITripPlannerDbContext
{
    DbSet<Trip> Trips { get; }
    DbSet<Country> Countries { get; }
    DbSet<Stay> Stays { get; }
    DbSet<Expense> Expenses { get; }
    DbSet<VisaEntry> VisaEntries { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}