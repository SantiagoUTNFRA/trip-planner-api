using MediatR;
using Microsoft.EntityFrameworkCore;
using TripPlanner.Application.Common.Interfaces;

namespace TripPlanner.Application.Trips.Queries;

public class GetTripByIdQueryHandler : IRequestHandler<GetTripByIdQuery, TripDto?>
{
    private readonly ITripPlannerDbContext _context;

    public GetTripByIdQueryHandler(ITripPlannerDbContext context)
    {
        _context = context;
    }

    public async Task<TripDto?> Handle(GetTripByIdQuery request, CancellationToken cancellationToken)
    {
        var trip = await _context.Trips
            .FirstOrDefaultAsync(t => t.Id == request.Id, cancellationToken);

        if (trip is null) return null;

        return new TripDto(
            trip.Id,
            trip.Name,
            trip.Description,
            trip.StartDate,
            trip.EndDate,
            trip.TotalBudget,
            trip.BaseCurrency,
            trip.CreatedAt
        );
    }
}