import React from 'react'
import type { Region } from '../types/cloud'
import StatusBadge from './StatusBadge'

const RegionCard = ({ region }: { region: Region }): JSX.Element => {
  return (
    <div className="card p-4">
      <div className="flex justify-between items-start">
        <div>
          <div className="font-semibold">{region.code}</div>
          <div className="text-sm text-muted">{region.location}</div>
        </div>
        <StatusBadge status={region.status} />
      </div>
      <div className="mt-3 text-sm">Servicios: {region.deployedServices.join(', ')}</div>
    </div>
  )
}

export default RegionCard
