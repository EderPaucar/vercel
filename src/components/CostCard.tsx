import React from 'react'

type Props = {
  title: string
  monthly: number
  annual: number
}

const CostCard = ({ title, monthly, annual }: Props): JSX.Element => {
  return (
    <div className="card p-4">
      <div className="flex justify-between items-center">
        <div>
          <div className="font-semibold">{title}</div>
          <div className="text-sm text-muted">Estimación</div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold">${monthly.toFixed(2)}</div>
          <div className="text-sm text-muted">${annual.toFixed(2)} anual</div>
        </div>
      </div>
    </div>
  )
}

export default CostCard
