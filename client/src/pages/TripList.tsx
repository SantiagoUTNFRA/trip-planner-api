import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { tripsApi, type Trip } from '../api/trips'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Mis viajes</h1>
          <p className="text-sm text-slate-500 mt-1">
            {loading ? '...' : `${trips.length} viajes guardados`}
          </p>
        </div>
        <Button onClick={() => navigate('/trips/create')}>
          + Nuevo viaje
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <>
            <TripCardSkeleton />
            <TripCardSkeleton />
            <TripCardSkeleton />
          </>
        ) : trips.length === 0 ? (
          <div className="col-span-3 text-center py-16 text-slate-400">
            <p className="text-4xl mb-3">🗺️</p>
            <p className="text-lg font-medium">No tenés viajes todavía</p>
            <p className="text-sm mt-1">Creá uno para empezar a planificar</p>
          </div>
        ) : (
          trips.map(trip => (
            <Card
              key={trip.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/trips/${trip.id}`)}
            >
              <CardHeader>
                <CardTitle className="text-base">{trip.name}</CardTitle>
                {trip.description && (
                  <p className="text-sm text-slate-500">{trip.description}</p>
                )}
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  📅 {new Date(trip.startDate).toLocaleDateString()}
                </span>
                <Badge variant="secondary">
                  {trip.totalBudget.toLocaleString()} {trip.baseCurrency}
                </Badge>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}