import React from 'react'
import {
  Home,
  FileText,
  DollarSign,
  Server,
  Shield,
  Wifi,
  Layers,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

const links = [
  {
    to: '/dashboard',
    label: 'Dashboard',
    icon: Home,
  },
  {
    to: '/planning',
    label: 'Planificación',
    icon: FileText,
  },
  {
    to: '/costs',
    label: 'Costos',
    icon: DollarSign,
  },
  {
    to: '/infrastructure',
    label: 'Infraestructura',
    icon: Server,
  },
  {
    to: '/security',
    label: 'Seguridad',
    icon: Shield,
  },
  {
    to: '/network',
    label: 'Red',
    icon: Wifi,
  },
  {
    to: '/services',
    label: 'Servicios',
    icon: Layers,
  },
]

const Sidebar = (): JSX.Element => {
  return (
    <aside className="w-20 md:w-64 bg-sidebar text-white h-screen sticky top-0 p-3 flex flex-col shrink-0">
      {/* Logo */}
      <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center font-bold">
          C
        </div>

        <div className="hidden md:block">
          <div className="text-lg font-bold">
            CloudOps
          </div>

          <div className="text-sm text-muted">
            Dashboard
          </div>
        </div>
      </div>

      {/* Navegación */}
      <nav className="flex flex-col gap-1">
        {links.map((link) => {
          const Icon = link.icon

          return (
            <NavLink
              key={link.to}
              to={link.to}
              title={link.label}
              className={({ isActive }) =>
                [
                  'flex items-center justify-center md:justify-start gap-3',
                  'p-3 rounded-lg transition-colors',
                  'hover:bg-white/10',
                  isActive ? 'bg-white/15 font-semibold' : '',
                ].join(' ')
              }
            >
              <Icon className="w-5 h-5 shrink-0" />

              <span className="hidden md:inline">
                {link.label}
              </span>
            </NavLink>
          )
        })}
      </nav>

      {/* Información inferior */}
      <div className="mt-auto hidden md:block p-3 text-sm text-muted">
        <div></div>
        <div></div>
      </div>
    </aside>
  )
}

export default Sidebar