using MediatR;
using TripPlanner.Application.Common.Interfaces;
using TripPlanner.Domain.Entities;

namespace TripPlanner.Application.Expenses.Commands;

public class CreateExpenseCommandHandler : IRequestHandler<CreateExpenseCommand, Guid>
{
    private readonly ITripPlannerDbContext _context;

    public CreateExpenseCommandHandler(ITripPlannerDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(CreateExpenseCommand request, CancellationToken cancellationToken)
    {
        var expense = new Expense
        {
            Id = Guid.NewGuid(),
            TripId = request.TripId,
            Amount = request.Amount,
            Currency = request.Currency,
            AmountInBaseCurrency = request.Amount,
            Category = Enum.Parse<ExpenseCategory>(request.Category),
            Notes = request.Notes,
            Date = request.Date.ToUniversalTime(),
        };

        _context.Expenses.Add(expense);
        await _context.SaveChangesAsync(cancellationToken);

        return expense.Id;
    }
}