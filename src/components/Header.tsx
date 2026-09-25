import React, { useState } from 'react'
import { Search, Bell, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Header = (): JSX.Element => {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [showAlerts, setShowAlerts] = useState(false)

  const alerts = [
    'Fallo detectado en la región us-east-1',
    'Copia de seguridad completada correctamente',
    'Se recomienda revisar IAM para los nuevos roles',
  ]

  const handleSearch = (event: React.FormEvent): void => {
    event.preventDefault()

    const value = query.trim()

    if (value.length === 0) {
      navigate('/services')
      return
    }

    navigate(`/services?search=${encodeURIComponent(value)}`)
  }

  return (
    <header className="w-full border-b border-border bg-white px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        <form
          onSubmit={handleSearch}
          className="relative flex-1 max-w-md"
        >
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />

          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar recursos..."
            aria-label="Buscar recursos"
            className="w-full pl-9 pr-12 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />

          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-primary px-2 py-1 text-[10px] font-medium text-white hover:bg-primary/90"
          >
            Buscar
          </button>
        </form>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowAlerts((current) => !current)}
              aria-label="Notificaciones"
              className="relative p-2 rounded-lg hover:bg-slate-100 transition"
            >
              <Bell className="w-5 h-5 text-muted" />

              <span
                className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-alerts"
                aria-hidden="true"
              />
            </button>

            {showAlerts && (
              <div className="absolute right-0 top-12 w-72 rounded-xl border border-border bg-white p-3 shadow-lg z-20">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-semibold text-main">
                    Alertas
                  </p>

                  <span className="text-[10px] font-medium rounded-full bg-alerts/10 px-2 py-1 text-alerts">
                    {alerts.length} nuevas
                  </span>
                </div>

                <ul className="space-y-2 text-sm text-muted">
                  {alerts.map((alert) => (
                    <li
                      key={alert}
                      className="rounded-lg border border-border bg-background px-2 py-2"
                    >
                      {alert}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 rounded-lg border border-border bg-background px-2 py-2 hover:bg-slate-50 transition"
          >
            <div
              className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-semibold"
              aria-label="Usuario Paucar"
            >
              A
            </div>

            <div className="hidden sm:block text-left text-sm">
              <div className="font-medium text-main">
                Paucar
              </div>

              <div className="text-xs text-muted">
                Administrador
              </div>
            </div>

            <ArrowRight className="hidden sm:block w-4 h-4 text-muted" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header