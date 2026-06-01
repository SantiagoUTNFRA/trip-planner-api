import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { tripsApi, type Trip } from '../api/trips'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { styles } from '@/lib/styles'

function TripCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-72 mt-1" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-32" />
      </CardContent>
    </Card>
  )
}

export default function TripList() {
  const navigate = useNavigate()
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    tripsApi.getAll()
      .then(setTrips)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <div className="relative rounded-2xl overflow-hidden mb-10 bg-gradient-to-br from-slate-800 to-slate-600 px-8 py-12 text-white">
        <div className="relative z-10">
          <p className="text-slate-300 text-sm font-medium mb-2 uppercase tracking-widest">Trip Planner</p>
          <h1 className="text-4xl font-bold mb-3">Planificá tu próximo<br />aventura</h1>
          <p className="text-slate-300 mb-6 max-w-md">
            Registrá tus viajes, controlá gastos por categoría y seguí tu presupuesto en tiempo real.
          </p>
          <Button onClick={() => navigate('/trips/create')} className="bg-white text-slate-800 hover:bg-slate-100">
            + Nuevo viaje
          </Button>
        </div>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-8xl opacity-10 select-none">✈️</div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-lg font-semibold ${styles.textPrimary}`}>
          Mis viajes
          {!loading && <span className={`ml-2 text-sm font-normal ${styles.textMuted}`}>{trips.length} guardados</span>}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <><TripCardSkeleton /><TripCardSkeleton /><TripCardSkeleton /></>
        ) : trips.length === 0 ? (
          <div className="col-span-3 text-center py-16 text-slate-400">
            <p className="text-4xl mb-3">🗺️</p>
            <p className="text-lg font-medium">No tenés viajes todavía</p>
            <p className="text-sm mt-1">Creá uno para empezar a planificar</p>
          </div>
        ) : (
          trips.map(trip => (
            <Card key={trip.id} className={styles.card} onClick={() => navigate(`/trips/${trip.id}`)}>
              <CardHeader className="pb-2">
                <CardTitle className={`text-base ${styles.textPrimary}`}>{trip.name}</CardTitle>
                {trip.description && <p className={`text-sm line-clamp-2 ${styles.textSecondary}`}>{trip.description}</p>}
              </CardHeader>
              <CardContent className="flex items-center justify-between pt-0">
                <span className={`text-sm ${styles.textMuted}`}>📅 {new Date(trip.startDate).toLocaleDateString()}</span>
                <Badge variant="secondary" className="font-medium">{trip.totalBudget.toLocaleString()} {trip.baseCurrency}</Badge>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}