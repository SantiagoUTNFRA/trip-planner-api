export const styles = {
  // Colores de texto
  textPrimary: 'text-slate-800',
  textSecondary: 'text-slate-500',
  textMuted: 'text-slate-400',

  // Cards
  card: 'hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer',

  // Badges por categoría
  categoryColors: {
    Accommodation: 'bg-blue-100 text-blue-800',
    Food: 'bg-green-100 text-green-800',
    Transport: 'bg-yellow-100 text-yellow-800',
    Activities: 'bg-purple-100 text-purple-800',
    Gear: 'bg-orange-100 text-orange-800',
    Health: 'bg-red-100 text-red-800',
    Visa: 'bg-pink-100 text-pink-800',
    Other: 'bg-slate-100 text-slate-800',
  } as Record<string, string>,
}