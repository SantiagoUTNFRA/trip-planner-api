using MediatR;

namespace TripPlanner.Application.Expenses.Queries;

public record GetExpensesByTripIdQuery(Guid TripId) : IRequest<List<ExpenseDto>>;

public record ExpenseDto(
    Guid Id,
    decimal Amount,
    string Currency,
    decimal AmountInBaseCurrency,
    string Category,
    string? Notes,
    DateTime Date,
    Guid TripId,
    Guid? StayId
);