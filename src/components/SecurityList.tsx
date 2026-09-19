import React from 'react'
import type { SecurityItem } from '../types/cloud'
import StatusBadge from './StatusBadge'

const SecurityList = ({ items }: { items: SecurityItem[] }): JSX.Element => {
  return (
    <div className="card p-4">
      <div className="font-semibold">Resumen de seguridad</div>
      <div className="mt-3 space-y-2">
        {items.map((it) => (
          <div key={it.id} className="flex items-center justify-between">
            <div>
              <div className="font-medium">{it.name}</div>
              <div className="text-xs text-muted">{it.category}</div>
            </div>
            <div className="ml-4">
              <StatusBadge status={it.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SecurityList
