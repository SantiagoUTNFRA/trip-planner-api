using MediatR;
using Microsoft.AspNetCore.Mvc;
using TripPlanner.Application.Trips.Commands;

namespace TripPlanner.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TripsController : ControllerBase
{
    private readonly IMediator _mediator;

    public TripsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> CreateTrip([FromBody] CreateTripCommand command)
    {
        var tripId = await _mediator.Send(command);
        return CreatedAtAction(nameof(CreateTrip), new { id = tripId }, new { id = tripId });
    }
}