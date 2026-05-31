using MediatR;

namespace TripPlanner.Application.Trips.Commands;

public record CreateTripCommand(
    string Name,
    string? Description,
    DateTime StartDate,
    DateTime? EndDate,
    decimal TotalBudget,
    string BaseCurrency
) : IRequest<Guid>;