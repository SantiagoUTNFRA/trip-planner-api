import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { tripsApi, type Trip } from '../api/trips'

export default function TripDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [trip, setTrip] = useState<Trip | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    tripsApi.getById(id)
      .then(setTrip)
      .catch(() => navigate('/'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p style={{ padding: '2rem' }}>Cargando...</p>
  if (!trip) return <p style={{ padding: '2rem' }}>Viaje no encontrado.</p>

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '0 1rem' }}>
      <button
        onClick={() => navigate('/')}
        style={{ marginBottom: '1rem', background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontSize: '0.875rem' }}
      >
        ← Volver
      </button>

      <h1 style={{ marginBottom: '0.5rem' }}>{trip.name}</h1>
      {trip.description && <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>{trip.description}</p>}

      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#6b7280' }}>Fecha de inicio</span>
          <span>{new Date(trip.startDate).toLocaleDateString()}</span>
        </div>
        {trip.endDate && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#6b7280' }}>Fecha de fin</span>
            <span>{new Date(trip.endDate).toLocaleDateString()}</span>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#6b7280' }}>Presupuesto</span>
          <span style={{ fontWeight: '500' }}>{trip.totalBudget.toLocaleString()} {trip.baseCurrency}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#6b7280' }}>Creado</span>
          <span>{new Date(trip.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  )
}