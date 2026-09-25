import React from 'react'
import type { AwsService } from '../types/cloud'
import StatusBadge from './StatusBadge'

const ServiceCard = ({ service }: { service: AwsService }): JSX.Element => {
  return (
    <div className="card p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <div className="font-semibold">{service.name}</div>
          <div className="text-sm text-muted">{service.category}</div>
        </div>
        <StatusBadge status={service.status} />
      </div>
      <div className="mt-2 text-sm">{service.description}</div>
      <div className="mt-3 text-xs text-muted">Función principal: {service.mainFunction}</div>
    </div>
  )
}

export default ServiceCard
