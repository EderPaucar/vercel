import React from 'react'
import type { SecurityStatus } from '../types/cloud'

type Props = {
  title?: string
  score: number
  status?: SecurityStatus
}

const SecurityCard = ({
  title = 'Seguridad',
  score,
  status = 'ok',
}: Props): JSX.Element => {
  const pct = Math.max(0, Math.min(100, score))

  const statusLabel: Record<SecurityStatus, string> = {
    ok: 'Correcto',
    warning: 'Advertencia',
    error: 'Error',
  }

  const statusColor: Record<SecurityStatus, string> = {
    ok: '#16A34A',
    warning: '#F59E0B',
    error: '#DC2626',
  }

  return (
    <div className="card p-3">
      <div className="flex justify-between items-center">
        <div className="font-semibold">{title}</div>

        <div
          className="text-sm font-medium"
          style={{ color: statusColor[status] }}
        >
          {statusLabel[status]}
        </div>
      </div>

      <div className="mt-3">
        <div className="w-full bg-border h-3 rounded-full overflow-hidden">
          <div
            className="h-3 rounded-full transition-all"
            style={{
              width: `${pct}%`,
              backgroundColor: statusColor[status],
            }}
          />
        </div>

        <div className="text-sm text-muted mt-2">
          Nivel de seguridad: {pct}%
        </div>
      </div>
    </div>
  )
}

export default SecurityCard