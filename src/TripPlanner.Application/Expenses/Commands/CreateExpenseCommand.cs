using MediatR;

namespace TripPlanner.Application.Expenses.Commands;

public record CreateExpenseCommand(
    Guid TripId,
    decimal Amount,
    string Currency,
    string Category,
    string? Notes,
    DateTime Date,
    Guid? StayId
) : IRequest<Guid>;