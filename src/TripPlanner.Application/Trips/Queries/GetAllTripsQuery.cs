using MediatR;

namespace TripPlanner.Application.Trips.Queries;

public record GetAllTripsQuery : IRequest<List<TripDto>>;