import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { tripsApi, type Trip, type Expense } from '../api/trips'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import AddExpenseDialog from '../components/AddExpenseDialog'
import { styles } from '@/lib/styles'

export default function TripDashboard() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [trip, setTrip] = useState<Trip | null>(null)
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)

  const loadData = () => {
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
  }

  useEffect(() => {
    loadData()
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
            className={`text-sm ${styles.textSecondary} hover:text-slate-800 mb-2 block`}
          >
            ← Volver
          </button>
          <h1 className={`text-2xl font-semibold ${styles.textPrimary}`}>{trip.name}</h1>
          {trip.description && <p className={`mt-1 ${styles.textSecondary}`}>{trip.description}</p>}
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary">
            📅 {new Date(trip.startDate).toLocaleDateString()}
          </Badge>
          <AddExpenseDialog tripId={id!} onExpenseAdded={loadData} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className={`text-sm font-medium ${styles.textSecondary}`}>Presupuesto total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-semibold ${styles.textPrimary}`}>{trip.totalBudget.toLocaleString()} {trip.baseCurrency}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className={`text-sm font-medium ${styles.textSecondary}`}>Gastado</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-red-600">{totalSpent.toLocaleString()} {trip.baseCurrency}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className={`text-sm font-medium ${styles.textSecondary}`}>Disponible</CardTitle>
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
          <CardTitle className={`text-sm font-medium ${styles.textSecondary}`}>
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
            <p className={`text-center py-8 ${styles.textMuted}`}>No hay gastos registrados todavía</p>
          ) : (
            expenses.map(expense => (
              <Card key={expense.id}>
                <CardContent className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${styles.categoryColors[expense.category] || styles.categoryColors.Other}`}>
                      {expense.category}
                    </span>
                    <div>
                      <p className={`text-sm font-medium ${styles.textPrimary}`}>{expense.notes || expense.category}</p>
                      <p className={`text-xs ${styles.textMuted}`}>{new Date(expense.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${styles.textPrimary}`}>{expense.amount} {expense.currency}</p>
                    <p className={`text-xs ${styles.textMuted}`}>{expense.amountInBaseCurrency} {trip.baseCurrency}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="categories" className="mt-4 space-y-2">
          {Object.keys(byCategory).length === 0 ? (
            <p className={`text-center py-8 ${styles.textMuted}`}>No hay gastos registrados todavía</p>
          ) : (
            Object.entries(byCategory)
              .sort((a, b) => b[1] - a[1])
              .map(([category, amount]) => (
                <Card key={category}>
                  <CardContent className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${styles.categoryColors[category] || styles.categoryColors.Other}`}>
                        {category}
                      </span>
                      <p className={`text-sm ${styles.textSecondary}`}>
                        {((amount / totalSpent) * 100).toFixed(1)}% del total
                      </p>
                    </div>
                    <p className={`text-sm font-semibold ${styles.textPrimary}`}>{amount.toLocaleString()} {trip.baseCurrency}</p>
                  </CardContent>
                </Card>
              ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}