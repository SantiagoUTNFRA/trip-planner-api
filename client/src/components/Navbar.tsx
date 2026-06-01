import { Link } from 'react-router-dom'
import { Separator } from '@/components/ui/separator'

export default function Navbar() {
  return (
    <header className="bg-white sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold text-slate-800 tracking-tight">
          ✈️ Trip Planner
        </Link>
        <nav className="flex items-center gap-6 text-sm text-slate-500">
          <Link to="/" className="hover:text-slate-800 transition-colors">
            Mis viajes
          </Link>
          <Link to="/trips/create" className="hover:text-slate-800 transition-colors">
            + Nuevo viaje
          </Link>
        </nav>
      </div>
      <Separator />
    </header>
  )
}