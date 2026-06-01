import { useState } from 'react'
import { tripsApi, type CreateExpenseRequest } from '../api/trips'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { styles } from '@/lib/styles'
import { toast } from 'sonner'

const CATEGORIES = Object.keys(styles.categoryColors)

interface Props {
  tripId: string
  onExpenseAdded: () => void
}

export default function AddExpenseDialog({ tripId, onExpenseAdded }: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<CreateExpenseRequest>({
    amount: 0,
    currency: 'NZD',
    category: 'Food',
    notes: null,
    date: new Date().toISOString().split('T')[0],
    stayId: null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await tripsApi.createExpense(tripId, {
        ...form,
        amount: Number(form.amount),
        date: new Date(form.date).toISOString(),
      })
      setOpen(false)
      setForm({ amount: 0, currency: 'NZD', category: 'Food', notes: null, date: new Date().toISOString().split('T')[0], stayId: null })
      toast.success('Gasto agregado correctamente')
      onExpenseAdded()
    } catch (error) {
      console.error(error)
      toast.error('Error al agregar el gasto')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">+ Agregar gasto</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar gasto</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Monto</Label>
              <Input name="amount" type="number" value={form.amount} onChange={handleChange} placeholder="0" />
            </div>
            <div className="space-y-1">
              <Label>Moneda</Label>
              <Input name="currency" value={form.currency} onChange={handleChange} placeholder="NZD" maxLength={3} />
            </div>
          </div>

          <div className="space-y-1">
            <Label>Categoría</Label>
            <Select value={form.category} onValueChange={val => setForm(prev => ({ ...prev, category: val }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(cat => (
                  <SelectItem key={cat} value={cat}>
                    <span className={`text-xs px-2 py-0.5 rounded-full mr-2 ${styles.categoryColors[cat]}`}>{cat}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label>Notas</Label>
            <Input name="notes" value={form.notes ?? ''} onChange={e => setForm(prev => ({ ...prev, notes: e.target.value || null }))} placeholder="Ej: Cena en Bangkok" />
          </div>

          <div className="space-y-1">
            <Label>Fecha</Label>
            <Input name="date" type="date" value={form.date} onChange={handleChange} />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar gasto'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}