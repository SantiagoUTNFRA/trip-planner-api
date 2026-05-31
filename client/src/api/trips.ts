import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5287/api',
})

export interface Trip {
    id: string
    name: string
    description: string | null
    startDate: string
    endDate: string | null
    totalBudget: number
    baseCurrency: string
    createdAt: string
}

export interface CreateTripRequest {
    name: string
    description: string | null
    startDate: string
    endDate: string | null
    totalBudget: number
    baseCurrency: string
}

export const tripsApi = {
    getById: async (id: string): Promise<Trip> => {
        const response = await api.get<Trip>(`/trips/${id}`)
        return response.data
    },

    create: async (data: CreateTripRequest): Promise<{ id: string }> => {
        const response = await api.post<{ id: string }>('/trips', data)
        return response.data
    },

    getAll: async (): Promise<Trip[]> => {
        const response = await api.get<Trip[]>('/trips')
        return response.data
    },
}