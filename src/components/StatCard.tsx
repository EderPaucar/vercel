import React from 'react'

type Props = {
  title: string
  value: string | number
  subtitle?: string
}

const StatCard = ({ title, value, subtitle }: Props): JSX.Element => {
  return (
    <div className="card p-3 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="text-sm text-muted">{title}</div>
      <div className="text-xl font-bold mt-2">{value}</div>
      {subtitle && <div className="text-xs text-muted mt-1">{subtitle}</div>}
    </div>
  )
}

export default StatCard
