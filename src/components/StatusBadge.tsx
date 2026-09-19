import React from 'react'
import type { SecurityStatus } from '../types/cloud'

type ServiceStatus =
  | 'healthy'
  | 'degraded'
  | 'down'
  | 'active'
  | 'idle'
  | 'disabled'
  | 'error'
  | 'ok'
  | 'warning'
  | 'inactive'

type Props = {
  status: ServiceStatus | SecurityStatus
}

const StatusBadge = ({ status }: Props): JSX.Element => {
  const map: Record<ServiceStatus | SecurityStatus, string> = {
    healthy: 'bg-security text-white',
    degraded: 'bg-yellow-400 text-black',
    down: 'bg-alerts text-white',
    active: 'bg-security text-white',
    idle: 'bg-muted text-white',
    disabled: 'bg-gray-400 text-white',
    error: 'bg-alerts text-white',
    ok: 'bg-security text-white',
    warning: 'bg-yellow-400 text-black',
    inactive: 'bg-gray-400 text-white',
  }

  const labels: Record<ServiceStatus | SecurityStatus, string> = {
    healthy: 'Saludable',
    degraded: 'Degradado',
    down: 'Caído',
    active: 'Activo',
    idle: 'En espera',
    disabled: 'Deshabilitado',
    error: 'Error',
    ok: 'Correcto',
    warning: 'Advertencia',
    inactive: 'Inactivo',
  }

  const cls = map[status]

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold ${cls}`}
    >
      {labels[status]}
    </span>
  )
}

export default StatusBadge