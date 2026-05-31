# Trip Planner API

REST API para planificar y registrar viajes largos por múltiples países. Permite organizar itinerarios, registrar gastos en moneda local con conversión automática, y hacer seguimiento del estado de visas por país.

> Proyecto de práctica profesional. Stack moderno .NET 9 con Clean Architecture.

---

## Descripción

API REST construida con .NET 9 y ASP.NET Core. El proyecto simula un entorno de desarrollo profesional, aplicando patrones y herramientas usados en la industria actual.

---

## Alcance

### ✅ Incluido
- CRUD de viajes y estadías
- Registro de gastos por categoría
- Conversión de moneda via API externa
- Seguimiento de visa por país (días usados / permitidos)
- Autenticación con JWT
- Reportes simples por país y categoría

### ❌ Fuera de alcance
- Frontend / UI (solo API, se testea con Swagger)
- Notificaciones push o email
- Integración con vuelos u hoteles
- Deploy en la nube
- Multi-usuario real

---

## Entidades principales

| Entidad | Descripción |
|--------|-------------|
| `Trip` | El viaje en sí. Tiene nombre, fechas y presupuesto total |
| `Country` | País visitado. Incluye info de moneda y visa |
| `Stay` | Estadía en una ciudad, vinculada a un Trip y un Country |
| `Expense` | Gasto registrado, con monto, moneda y categoría |
| `VisaEntry` | Registro de entrada/salida por país |

---

## Stack técnico

| Capa | Tecnología |
|------|-----------|
| Runtime | .NET 9 · ASP.NET Core |
| Arquitectura | Clean Architecture · CQRS · MediatR |
| Base de datos | PostgreSQL (Docker) · EF Core |
| Autenticación | JWT Bearer |
| HTTP externo | Refit |
| Documentación API | Swagger / Scalar |
| Entorno local | Docker Compose |

---

## Estructura del proyecto
src/
├── TripPlanner.API             → Endpoints, configuración
├── TripPlanner.Application     → Lógica, CQRS, MediatR
├── TripPlanner.Domain          → Entidades, interfaces
└── TripPlanner.Infrastructure  → EF Core, repositorios, servicios externos

---

## Documentación

- [`docs/erd.md`](docs/erd.md) — Diagrama de entidades
- [`docs/architecture.md`](docs/architecture.md) — Decisiones de arquitectura