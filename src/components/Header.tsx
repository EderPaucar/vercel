import React from 'react'
import { Search, Bell } from 'lucide-react'

const Header = (): JSX.Element => {
  return (
    <header className="w-full border-b border-border bg-white px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* Buscador */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />

          <input
            type="search"
            placeholder="Buscar recursos..."
            aria-label="Buscar recursos"
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        {/* Usuario y notificaciones */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Notificaciones"
            className="relative p-2 rounded-lg hover:bg-slate-100 transition"
          >
            <Bell className="w-5 h-5 text-muted" />

            <span
              className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-alerts"
              aria-hidden="true"
            />
          </button>

          <div className="flex items-center gap-2">
            <div
              className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-semibold"
              aria-label="Usuario Wilfredo"
            >
              A
            </div>

            <div className="hidden sm:block text-sm">
              <div className="font-medium text-main">
                Paucar
              </div>

              <div className="text-xs text-muted">
                Administrador
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header