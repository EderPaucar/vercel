import React from 'react'

type Props = {
  title: string
  value: string | number
  subtitle?: string
}

const StatCard = ({ title, value, subtitle }: Props): JSX.Element => {
  return (
    <div className="card p-4">
      <div className="text-sm text-muted">{title}</div>
      <div className="text-2xl font-bold mt-2">{value}</div>
      {subtitle && <div className="text-sm text-muted mt-1">{subtitle}</div>}
    </div>
  )
}

export default StatCard
