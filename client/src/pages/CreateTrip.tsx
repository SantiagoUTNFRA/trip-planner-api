import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { tripsApi, type CreateTripRequest } from '../api/trips'

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
        <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '0 1rem' }}>
            <h1 style={{ marginBottom: '1.5rem' }}>Crear viaje</h1>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <label>Nombre *</label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Ej: Southeast Asia 2025"
                        style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                    />
                    {errors.Name && <p style={{ color: '#dc2626', fontSize: '0.875rem' }}>{errors.Name[0]}</p>}
                </div>

                <div>
                    <label>Descripción</label>
                    <textarea
                        name="description"
                        value={form.description ?? ''}
                        onChange={handleChange}
                        rows={3}
                        style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                    />
                </div>

                <div>
                    <label>Fecha de inicio *</label>
                    <input
                        type="date"
                        name="startDate"
                        value={form.startDate}
                        onChange={handleChange}
                        style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                    />
                    {errors.StartDate && <p style={{ color: '#dc2626', fontSize: '0.875rem' }}>{errors.StartDate[0]}</p>}
                </div>

                <div>
                    <label>Fecha de fin</label>
                    <input
                        type="date"
                        name="endDate"
                        value={form.endDate ?? ''}
                        onChange={handleChange}
                        style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                    />
                </div>

                <div>
                    <label>Presupuesto total *</label>
                    <input
                        type="number"
                        name="totalBudget"
                        value={form.totalBudget}
                        onChange={handleChange}
                        style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                    />
                    {errors.TotalBudget && <p style={{ color: '#dc2626', fontSize: '0.875rem' }}>{errors.TotalBudget[0]}</p>}
                </div>

                <div>
                    <label>Moneda base *</label>
                    <input
                        name="baseCurrency"
                        value={form.baseCurrency}
                        onChange={handleChange}
                        maxLength={3}
                        style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                    />
                    {errors.BaseCurrency && <p style={{ color: '#dc2626', fontSize: '0.875rem' }}>{errors.BaseCurrency[0]}</p>}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{ padding: '0.75rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}
                >
                    {loading ? 'Creando...' : 'Crear viaje'}
                </button>
            </form>
        </div>
    )
}