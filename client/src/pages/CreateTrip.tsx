import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { tripsApi, type CreateTripRequest } from '../api/trips'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function CreateTrip() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [form, setForm] = useState<CreateTripRequest>({
    name: '',
    description: null,
    startDate: '',
    endDate: null,
    totalBudget: 0,
    baseCurrency: 'NZD',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})
    try {
      const payload = {
        ...form,
        startDate: form.startDate ? new Date(form.startDate).toISOString() : '',
        endDate: form.endDate ? new Date(form.endDate).toISOString() : null,
        totalBudget: Number(form.totalBudget),
      }
      const result = await tripsApi.create(payload)
      navigate(`/trips/${result.id}`)
    } catch (error: any) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      <button
        onClick={() => navigate('/')}
        className="text-sm text-slate-500 hover:text-slate-800 mb-4 block"
      >
        ← Volver
      </button>

      <Card>
        <CardHeader>
          <CardTitle>Crear nuevo viaje</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="space-y-1">
              <Label>Nombre *</Label>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ej: Southeast Asia 2025"
              />
              {errors.Name && <p className="text-xs text-red-500">{errors.Name[0]}</p>}
            </div>

            <div className="space-y-1">
              <Label>Descripción</Label>
              <Input
                name="description"
                value={form.description ?? ''}
                onChange={handleChange}
                placeholder="Ej: Viaje largo por el sudeste asiático"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Fecha de inicio *</Label>
                <Input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                />
                {errors.StartDate && <p className="text-xs text-red-500">{errors.StartDate[0]}</p>}
              </div>
              <div className="space-y-1">
                <Label>Fecha de fin</Label>
                <Input
                  type="date"
                  name="endDate"
                  value={form.endDate ?? ''}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Presupuesto total *</Label>
                <Input
                  type="number"
                  name="totalBudget"
                  value={form.totalBudget}
                  onChange={handleChange}
                  placeholder="0"
                />
                {errors.TotalBudget && <p className="text-xs text-red-500">{errors.TotalBudget[0]}</p>}
              </div>
              <div className="space-y-1">
                <Label>Moneda base *</Label>
                <Input
                  name="baseCurrency"
                  value={form.baseCurrency}
                  onChange={handleChange}
                  placeholder="NZD"
                  maxLength={3}
                />
                {errors.BaseCurrency && <p className="text-xs text-red-500">{errors.BaseCurrency[0]}</p>}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creando...' : 'Crear viaje'}
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  )
}