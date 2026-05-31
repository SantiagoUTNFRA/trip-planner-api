using Microsoft.EntityFrameworkCore;
using TripPlanner.Application.Common.Interfaces;
using TripPlanner.Domain.Entities;

namespace TripPlanner.Infrastructure.Persistence;

public class TripPlannerDbContext : DbContext, ITripPlannerDbContext
{
    public TripPlannerDbContext(DbContextOptions<TripPlannerDbContext> options)
        : base(options)
    {
    }

    public DbSet<Trip> Trips => Set<Trip>();
    public DbSet<Country> Countries => Set<Country>();
    public DbSet<Stay> Stays => Set<Stay>();
    public DbSet<Expense> Expenses => Set<Expense>();
    public DbSet<VisaEntry> VisaEntries => Set<VisaEntry>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(TripPlannerDbContext).Assembly);
    }
}