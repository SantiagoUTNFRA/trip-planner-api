using MediatR;
using Microsoft.AspNetCore.Mvc;
using TripPlanner.Application.Trips.Commands;
using TripPlanner.Application.Trips.Queries;

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

    [HttpGet("{id}")]
    public async Task<IActionResult> GetTrip(Guid id)
    {
        var trip = await _mediator.Send(new GetTripByIdQuery(id));

        if (trip is null) return NotFound();

        return Ok(trip);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllTrips()
    {
        var trips = await _mediator.Send(new GetAllTripsQuery());
        return Ok(trips);
    }
}