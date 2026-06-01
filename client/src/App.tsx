import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import TripList from './pages/TripList'
import TripDashboard from './pages/TripDashboard'
import CreateTrip from './pages/CreateTrip'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main className="max-w-5xl mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<TripList />} />
            <Route path="/trips/create" element={<CreateTrip />} />
            <Route path="/trips/:id" element={<TripDashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App