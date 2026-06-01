import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { tripsApi, type Trip, type Expense } from '../api/trips'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'

const CATEGORY_COLORS: Record<string, string> = {
  Accommodation: 'bg-blue-100 text-blue-800',
  Food: 'bg-green-100 text-green-800',
  Transport: 'bg-yellow-100 text-yellow-800',
  Activities: 'bg-purple-100 text-purple-800',
  Gear: 'bg-orange-100 text-orange-800',
  Health: 'bg-red-100 text-red-800',
  Visa: 'bg-pink-100 text-pink-800',
  Other: 'bg-slate-100 text-slate-800',
}

export default function TripDashboard() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [trip, setTrip] = useState<Trip | null>(null)
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    Promise.all([
      tripsApi.getById(id),
      tripsApi.getExpenses(id),
    ])
      .then(([tripData, expensesData]) => {
        setTrip(tripData)
        setExpenses(expensesData)
      })
      .catch(() => navigate('/'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-64" />
      <div className="grid grid-cols-3 gap-4">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>
    </div>
  )

  if (!trip) return null

  const totalSpent = expenses.reduce((sum, e) => sum + e.amountInBaseCurrency, 0)
  const budgetUsedPercent = Math.min((totalSpent / trip.totalBudget) * 100, 100)
  const remaining = trip.totalBudget - totalSpent

  const byCategory = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amountInBaseCurrency
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <button
            onClick={() => navigate('/')}
            className="text-sm text-slate-500 hover:text-slate-800 mb-2 block"
          >
            ← Volver
          </button>
          <h1 className="text-2xl font-semibold text-slate-800">{trip.name}</h1>
          {trip.description && <p className="text-slate-500 mt-1">{trip.description}</p>}
        </div>
        <Badge variant="secondary">
          📅 {new Date(trip.startDate).toLocaleDateString()}
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Presupuesto total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{trip.totalBudget.toLocaleString()} {trip.baseCurrency}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Gastado</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-red-600">{totalSpent.toLocaleString()} {trip.baseCurrency}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Disponible</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-semibold ${remaining < 0 ? 'text-red-600' : 'text-green-600'}`}>
              {remaining.toLocaleString()} {trip.baseCurrency}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-500">
            Uso del presupuesto — {budgetUsedPercent.toFixed(1)}%
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={budgetUsedPercent} className="h-3" />
        </CardContent>
      </Card>

      <Tabs defaultValue="expenses">
        <TabsList>
          <TabsTrigger value="expenses">Gastos ({expenses.length})</TabsTrigger>
          <TabsTrigger value="categories">Por categoría</TabsTrigger>
        </TabsList>

        <TabsContent value="expenses" className="mt-4 space-y-2">
          {expenses.length === 0 ? (
            <p className="text-slate-400 text-center py-8">No hay gastos registrados todavía</p>
          ) : (
            expenses.map(expense => (
              <Card key={expense.id}>
                <CardContent className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${CATEGORY_COLORS[expense.category] || CATEGORY_COLORS.Other}`}>
                      {expense.category}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{expense.notes || expense.category}</p>
                      <p className="text-xs text-slate-400">{new Date(expense.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{expense.amount} {expense.currency}</p>
                    <p className="text-xs text-slate-400">{expense.amountInBaseCurrency} {trip.baseCurrency}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="categories" className="mt-4 space-y-2">
          {Object.keys(byCategory).length === 0 ? (
            <p className="text-slate-400 text-center py-8">No hay gastos registrados todavía</p>
          ) : (
            Object.entries(byCategory)
              .sort((a, b) => b[1] - a[1])
              .map(([category, amount]) => (
                <Card key={category}>
                  <CardContent className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${CATEGORY_COLORS[category] || CATEGORY_COLORS.Other}`}>
                        {category}
                      </span>
                      <p className="text-sm text-slate-500">
                        {((amount / totalSpent) * 100).toFixed(1)}% del total
                      </p>
                    </div>
                    <p className="text-sm font-semibold">{amount.toLocaleString()} {trip.baseCurrency}</p>
                  </CardContent>
                </Card>
              ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}