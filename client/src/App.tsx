import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreateTrip from './pages/CreateTrip'
import TripDetail from './pages/TripDetail'
import TripList from './pages/TripList'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TripList />} />
        <Route path="/trips/create" element={<CreateTrip />} />
        <Route path="/trips/:id" element={<TripDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App