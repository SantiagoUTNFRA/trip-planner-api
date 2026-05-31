using FluentValidation;

namespace TripPlanner.Application.Trips.Commands;

public class CreateTripCommandValidator : AbstractValidator<CreateTripCommand>
{
    public CreateTripCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("El nombre del viaje es obligatorio.")
            .MaximumLength(100).WithMessage("El nombre no puede superar los 100 caracteres.");

        RuleFor(x => x.StartDate)
            .NotEmpty().WithMessage("La fecha de inicio es obligatoria.");

        RuleFor(x => x.EndDate)
            .GreaterThan(x => x.StartDate)
            .When(x => x.EndDate.HasValue)
            .WithMessage("La fecha de fin debe ser posterior a la fecha de inicio.");

        RuleFor(x => x.TotalBudget)
            .GreaterThan(0).WithMessage("El presupuesto debe ser mayor a 0.");

        RuleFor(x => x.BaseCurrency)
            .NotEmpty().WithMessage("La moneda base es obligatoria.")
            .Length(3).WithMessage("La moneda debe ser un código de 3 letras (ej: NZD, USD).");
    }
}