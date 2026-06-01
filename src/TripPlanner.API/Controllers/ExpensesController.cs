using MediatR;
using Microsoft.AspNetCore.Mvc;
using TripPlanner.Application.Expenses.Queries;
using TripPlanner.Application.Expenses.Commands;


namespace TripPlanner.API.Controllers;

[ApiController]
[Route("api/trips/{tripId}/expenses")]
public class ExpensesController : ControllerBase
{
    private readonly IMediator _mediator;

    public ExpensesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetExpenses(Guid tripId)
    {
        var expenses = await _mediator.Send(new GetExpensesByTripIdQuery(tripId));
        return Ok(expenses);
    }

    [HttpPost]
    public async Task<IActionResult> CreateExpense(Guid tripId, [FromBody] CreateExpenseCommand command)
    {
        var expenseId = await _mediator.Send(command with { TripId = tripId });
        return CreatedAtAction(nameof(GetExpenses), new { tripId }, new { id = expenseId });
    }
}