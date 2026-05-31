using MediatR;

namespace TripPlanner.Application.Trips.Queries;

public record GetTripByIdQuery(Guid Id) : IRequest<TripDto?>;

public record TripDto(
    Guid Id,
    string Name,
    string? Description,
    DateTime StartDate,
    DateTime? EndDate,
    decimal TotalBudget,
    string BaseCurrency,
    DateTime CreatedAt
);