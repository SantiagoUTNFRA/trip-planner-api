using MediatR;
using Microsoft.EntityFrameworkCore;
using TripPlanner.Application.Common.Interfaces;

namespace TripPlanner.Application.Expenses.Queries;

public class GetExpensesByTripIdQueryHandler : IRequestHandler<GetExpensesByTripIdQuery, List<ExpenseDto>>
{
    private readonly ITripPlannerDbContext _context;

    public GetExpensesByTripIdQueryHandler(ITripPlannerDbContext context)
    {
        _context = context;
    }

    public async Task<List<ExpenseDto>> Handle(GetExpensesByTripIdQuery request, CancellationToken cancellationToken)
    {
        return await _context.Expenses
            .Where(e => e.TripId == request.TripId)
            .OrderByDescending(e => e.Date)
            .Select(e => new ExpenseDto(
                e.Id,
                e.Amount,
                e.Currency,
                e.AmountInBaseCurrency,
                e.Category.ToString(),
                e.Notes,
                e.Date,
                e.TripId,
                e.StayId
            ))
            .ToListAsync(cancellationToken);
    }
}