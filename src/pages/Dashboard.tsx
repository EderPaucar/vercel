import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  MapPin,
  Server,
  ShieldCheck,
} from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import StatCard from '../components/StatCard'
import ServiceCard from '../components/ServiceCard'
import SecurityCard from '../components/SecurityCard'

import {
  awsServices,
  regions,
  securityItems,
  costEstimates,
} from '../data/awsServices'

interface ActiveProposal {
  solutionName: string
  region: string
  users: number
  availability: string
  services: string[]
  monthlyCost: number
  annualCost: number
  readiness: number
}

const readActiveProposal = (): ActiveProposal | null => {
  try {
    const saved = localStorage.getItem('cloudops-active-proposal')
    return saved ? (JSON.parse(saved) as ActiveProposal) : null
  } catch {
    return null
  }
}

const Dashboard = (): JSX.Element => {
  const navigate = useNavigate()

  const [activeProposal] = useState<ActiveProposal | null>(
    readActiveProposal,
  )

  const [selectedRegionId, setSelectedRegionId] = useState<string>(
    activeProposal?.region ?? regions[0]?.id ?? '',
  )

  const [chartView, setChartView] = useState<'monthly' | 'annual'>(
    'monthly',
  )

  const selectedRegion = useMemo(
    () =>
      regions.find(
        (region) => region.id === selectedRegionId,
      ),
    [selectedRegionId],
  )

  const regionServices = useMemo(() => {
    if (!selectedRegion) return []

    const plannedServices =
      activeProposal?.region === selectedRegion.id
        ? activeProposal.services
        : selectedRegion.plannedServices

    return awsServices.filter((service) =>
      plannedServices.some(
        (plannedService) =>
          plannedService.toLowerCase() ===
          service.name.toLowerCase(),
      ),
    )
  }, [activeProposal, selectedRegion])

  const regionCosts = useMemo(() => {
    if (!selectedRegion) return []

    const plannedServices =
      activeProposal?.region === selectedRegion.id
        ? activeProposal.services
        : selectedRegion.plannedServices

    return costEstimates.filter((cost) =>
      plannedServices.some(
        (service) =>
          service.toLowerCase() ===
          cost.serviceName.toLowerCase(),
      ),
    )
  }, [activeProposal, selectedRegion])

  const monthlyCost = useMemo(
    () =>
      regionCosts.reduce(
        (total, cost) => total + cost.monthlyCost,
        0,
      ),
    [regionCosts],
  )

  const annualCost = useMemo(
    () =>
      regionCosts.reduce(
        (total, cost) => total + cost.annualCost,
        0,
      ),
    [regionCosts],
  )

  const cloudResources =
    selectedRegion?.plannedServices.length ?? 0

  const infrastructureStatus = selectedRegion
    ? 'Planificada'
    : 'Sin información'

  const securityOk = securityItems.filter(
    (item) => item.status === 'ok',
  ).length

  const securityWarnings = securityItems.filter(
    (item) => item.status === 'warning',
  ).length

  const securityStatus =
    securityWarnings === 0
      ? 'Protección considerada'
      : 'Revisión pendiente'

  const securityScore = Math.round(
    (securityOk / securityItems.length) * 100,
  )

  const chartData = useMemo(
    () =>
      regionCosts.map((cost) => ({
        service: cost.serviceName,
        monthly: cost.monthlyCost,
        annual: cost.annualCost,
      })),
    [regionCosts],
  )

  const chartKey =
    chartView === 'monthly' ? 'monthly' : 'annual'

  const chartTitle =
    chartView === 'monthly'
      ? 'Costo mensual por servicio'
      : 'Costo anual por servicio'

  const formatCurrency = (value: number): string =>
    `$${value.toFixed(2)}`

  return (
    <div className="space-y-4">
      {/* ENCABEZADO */}

      <div>
        <h1 className="text-main-title">
          Dashboard CloudOps
        </h1>

        <p className="text-muted mt-1">
          Resumen general de la solución Cloud y sus
          servicios considerados.
        </p>
      </div>

      {activeProposal && (
        <div className="card border-l-4 border-primary bg-blue-50/40 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary">
                Solución activa
              </p>

              <h2 className="mt-1 text-lg font-bold text-main">
                {activeProposal.solutionName}
              </h2>

              <p className="mt-1 text-sm text-muted">
                {activeProposal.services.length} servicios ·{' '}
                {activeProposal.users.toLocaleString('es-PE')} usuarios ·{' '}
                Disponibilidad {activeProposal.availability}
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate('/planning')}
              className="flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              Editar propuesta
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
              <div className="rounded-lg border border-blue-100 bg-white/80 px-3 py-2">
                <p className="text-[11px] font-semibold uppercase text-muted">
                  Preparación
                </p>
                <p className="mt-1 text-lg font-bold text-primary">
                  {activeProposal.readiness}%
                </p>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-blue-100">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${activeProposal.readiness}%` }}
                  />
                </div>
              </div>

              <div className="rounded-lg border border-blue-100 bg-white/80 px-3 py-2">
                <p className="text-[11px] font-semibold uppercase text-muted">
                  Costo mensual
                </p>
                <p className="mt-1 text-lg font-bold text-main">
                  {formatCurrency(activeProposal.monthlyCost)}
                </p>
                <p className="text-xs text-muted">estimado</p>
              </div>

              <div className="rounded-lg border border-blue-100 bg-white/80 px-3 py-2">
                <p className="text-[11px] font-semibold uppercase text-muted">
                  Costo anual
                </p>
                <p className="mt-1 text-lg font-bold text-main">
                  {formatCurrency(activeProposal.annualCost)}
                </p>
                <p className="text-xs text-muted">proyección</p>
              </div>
            </div>
        </div>
      )}

      {/* SELECTOR DE REGIÓN */}

      <div className="card p-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />

              <h2 className="text-lg font-semibold text-main">
                Región seleccionada
              </h2>
            </div>

            <p className="text-sm text-muted mt-1">
              Selecciona una región para actualizar la
              información del dashboard.
            </p>
          </div>

          <div className="w-full md:w-80">
            <label
              htmlFor="region-dashboard"
              className="block text-sm font-medium text-main mb-2"
            >
              Región
            </label>

            <select
              id="region-dashboard"
              value={selectedRegionId}
              onChange={(event) =>
                setSelectedRegionId(event.target.value)
              }
              className="w-full border border-border rounded-lg px-4 py-2.5 bg-white text-main outline-none focus:border-primary"
            >
              {regions.map((region) => (
                <option
                  key={region.id}
                  value={region.id}
                >
                  {region.code} — {region.location}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedRegion && (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold text-main">
              {selectedRegion.code}
            </span>

            <span className="text-sm text-muted">
              {selectedRegion.location}
            </span>

            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
              Considerada
            </span>
          </div>
        )}
      </div>

      {/* TARJETAS PRINCIPALES */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        <StatCard
          title="Servicios utilizados"
          value={String(regionServices.length)}
          subtitle={
            selectedRegion
              ? `${selectedRegion.code} activos`
              : 'Sin región'
          }
        />

        <StatCard
          title="Región seleccionada"
          value={selectedRegion?.code ?? 'N/D'}
          subtitle={
            selectedRegion?.location ??
            'Sin región seleccionada'
          }
        />

        <StatCard
          title="Costo mensual estimado"
          value={formatCurrency(monthlyCost)}
          subtitle="Estimación mensual"
        />

        <StatCard
          title="Costo anual estimado"
          value={formatCurrency(annualCost)}
          subtitle="Estimación anual"
        />
      </div>

      {/* ESTADO GENERAL */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="card p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted">
                Estado de seguridad
              </p>

              <h3 className="text-xl font-bold text-main mt-1">
                {securityStatus}
              </h3>
            </div>

            <div className="w-10 h-10 rounded-lg bg-security/10 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-security" />
            </div>
          </div>

          <p className="text-xs text-muted mt-3">
            {securityOk} controles correctos y{' '}
            {securityWarnings} pendientes de revisión.
          </p>
        </div>

        <div className="card p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted">
                Recursos Cloud
              </p>

              <h3 className="text-xl font-bold text-main mt-1">
                {cloudResources}
              </h3>
            </div>

            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Server className="w-5 h-5 text-primary" />
            </div>
          </div>

          <p className="text-xs text-muted mt-3">
            Recursos previstos para la solución actual.
          </p>
        </div>

        <div className="card p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted">
                Estado de la arquitectura
              </p>

              <h3 className="text-xl font-bold text-main mt-1">
                {infrastructureStatus}
              </h3>
            </div>

            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary" />
            </div>
          </div>

          <p className="text-xs text-muted mt-3">
            Estado de planificación de la región seleccionada.
          </p>
        </div>
      </div>

      {/* INFORMACIÓN DE LA REGIÓN */}

      {selectedRegion && (
        <div className="card p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-main">
                Infraestructura de la región
              </h2>

              <p className="text-sm text-muted mt-1">
                Servicios considerados en{' '}
                {selectedRegion.code}.
              </p>
            </div>

            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              Planificada
            </span>
          </div>

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            <div className="rounded-lg border border-border p-4">
              <p className="text-xs text-muted">
                Región
              </p>

              <p className="font-semibold text-main mt-1">
                {selectedRegion.code}
              </p>
            </div>

            <div className="rounded-lg border border-border p-4">
              <p className="text-xs text-muted">
                Ubicación
              </p>

              <p className="font-semibold text-main mt-1">
                {selectedRegion.location}
              </p>
            </div>

            <div className="rounded-lg border border-border p-4">
              <p className="text-xs text-muted">
                Servicios
              </p>

              <p className="font-semibold text-main mt-1">
                {selectedRegion.plannedServices.length}
              </p>
            </div>

            <div className="rounded-lg border border-border p-4">
              <p className="text-xs text-muted">
                Estado
              </p>

              <p className="font-semibold text-main mt-1">
                {infrastructureStatus}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SERVICIOS DE LA REGIÓN */}

      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-semibold text-main">
              Servicios en la región
            </h2>

            <p className="text-sm text-muted mt-1">
              Servicios considerados para{' '}
              {selectedRegion?.code ??
                'la región seleccionada'}.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/services')}
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Ver servicios
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {regionServices.length === 0 ? (
          <div className="card p-5 text-center">
            <Server className="w-8 h-8 mx-auto text-muted mb-3" />

            <h3 className="font-semibold text-main">
              No hay servicios considerados
            </h3>

            <p className="text-sm text-muted mt-1">
              Esta región no tiene servicios registrados
              en la planificación.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {regionServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
              />
            ))}
          </div>
        )}
      </div>

      {/* COSTOS */}

      <div className="card p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-main">
              Costos estimados
            </h2>

            <p className="text-sm text-muted mt-1">
              Estimación de costos para los servicios
              considerados en{' '}
              {selectedRegion?.code ??
                'la región seleccionada'}.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setChartView('monthly')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                chartView === 'monthly'
                  ? 'bg-primary text-white'
                  : 'bg-background text-muted hover:bg-border'
              }`}
            >
              Mensual
            </button>

            <button
              type="button"
              onClick={() => setChartView('annual')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                chartView === 'annual'
                  ? 'bg-primary text-white'
                  : 'bg-background text-muted hover:bg-border'
              }`}
            >
              Anual
            </button>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Resumen */}

          <div className="space-y-3">
            <div className="rounded-lg bg-costs/10 border border-border p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-costs" />

                <span className="text-sm text-muted">
                  Costo mensual
                </span>
              </div>

              <p className="text-2xl font-bold text-main mt-2">
                {formatCurrency(monthlyCost)}
              </p>
            </div>

            <div className="rounded-lg bg-background border border-border p-4">
              <span className="text-sm text-muted">
                Costo anual
              </span>

              <p className="text-2xl font-bold text-main mt-2">
                {formatCurrency(annualCost)}
              </p>
            </div>
          </div>

          {/* Gráfico */}

          <div className="lg:col-span-2 h-72">
            {chartData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-sm text-muted">
                No existen datos de costos para esta región.
              </div>
            ) : (
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="service" />

                  <YAxis />

                  <Tooltip
                    formatter={(value) =>
                      formatCurrency(Number(value))
                    }
                  />

                  <Bar
                    dataKey={chartKey}
                    name={chartTitle}
                    fill="#2563EB"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* RESUMEN DE SEGURIDAD */}

      <div className="card p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold text-main">
              Resumen de seguridad
            </h2>

            <p className="text-sm text-muted mt-1">
              Evaluación de los controles de seguridad
              considerados para la solución CloudOps.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {securityWarnings > 0 ? (
              <AlertTriangle className="w-5 h-5 text-costs" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-security" />
            )}

            <span className="text-sm font-semibold text-main">
              {securityScore}% considerado
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
          {securityItems.slice(0, 3).map((item) => {
            const score =
              item.status === 'ok' ? 100 : 60

            return (
              <SecurityCard
                key={item.id}
                title={item.name}
                score={score}
                status={item.status}
              />
            )
          })}
        </div>

        <button
          type="button"
          onClick={() => navigate('/security')}
          className="mt-5 flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          Ver módulo de seguridad
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default Dashboard