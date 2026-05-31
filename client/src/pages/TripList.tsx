import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { tripsApi, type Trip } from '../api/trips'

export default function TripList() {
  const navigate = useNavigate()
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    tripsApi.getAll()
      .then(setTrips)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p style={{ padding: '2rem' }}>Cargando...</p>

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1>Mis viajes</h1>
        <button
          onClick={() => navigate('/trips/create')}
          style={{ padding: '0.5rem 1rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}
        >
          + Nuevo viaje
        </button>
      </div>

      {trips.length === 0 ? (
        <p style={{ color: '#6b7280' }}>No tenés viajes todavía. ¡Creá uno!</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {trips.map(trip => (
            <div
              key={trip.id}
              onClick={() => navigate(`/trips/${trip.id}`)}
              style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1.25rem', cursor: 'pointer' }}
            >
              <h2 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{trip.name}</h2>
              {trip.description && <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.75rem' }}>{trip.description}</p>}
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                <span>📅 {new Date(trip.startDate).toLocaleDateString()}</span>
                <span>💰 {trip.totalBudget.toLocaleString()} {trip.baseCurrency}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}