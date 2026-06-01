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

export interface Expense {
    id: string
    amount: number
    currency: string
    amountInBaseCurrency: number
    category: string
    notes: string | null
    date: string
    tripId: string
    stayId: string | null
}

export interface CreateExpenseRequest {
    amount: number
    currency: string
    category: string
    notes: string | null
    date: string
    stayId: string | null
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

    getExpenses: async (tripId: string): Promise<Expense[]> => {
        const response = await api.get<Expense[]>(`/trips/${tripId}/expenses`)
        return response.data
    },

    createExpense: async (tripId: string, data: CreateExpenseRequest): Promise<{ id: string }> => {
        const response = await api.post<{ id: string }>(`/trips/${tripId}/expenses`, data)
        return response.data
    },

}