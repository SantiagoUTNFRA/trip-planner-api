using MediatR;
using Microsoft.EntityFrameworkCore;
using TripPlanner.Application.Common.Interfaces;

namespace TripPlanner.Application.Trips.Queries;

public class GetAllTripsQueryHandler : IRequestHandler<GetAllTripsQuery, List<TripDto>>
{
    private readonly ITripPlannerDbContext _context;

    public GetAllTripsQueryHandler(ITripPlannerDbContext context)
    {
        _context = context;
    }

    public async Task<List<TripDto>> Handle(GetAllTripsQuery request, CancellationToken cancellationToken)
    {
        return await _context.Trips
            .OrderByDescending(t => t.CreatedAt)
            .Select(t => new TripDto(
                t.Id,
                t.Name,
                t.Description,
                t.StartDate,
                t.EndDate,
                t.TotalBudget,
                t.BaseCurrency,
                t.CreatedAt
            ))
            .ToListAsync(cancellationToken);
    }
}