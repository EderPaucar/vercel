import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Clock3,
  DollarSign,
  Eye,
  LayoutDashboard,
  Network,
  Plus,
  RefreshCw,
  Search,
  Server,
  ShieldCheck,
} from 'lucide-react'

import StatCard from '../components/StatCard'
import SecurityCard from '../components/SecurityCard'
import RegionCard from '../components/RegionCard'
import ServiceCard from '../components/ServiceCard'
import SecurityList from '../components/SecurityList'

import {
  awsServices,
  regions,
  securityItems,
  costEstimates,
} from '../data/awsServices'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

const Dashboard = (): JSX.Element => {
  const navigate = useNavigate()

  // =====================================================
  // ESTADOS
  // =====================================================

  const [searchService, setSearchService] = useState('')
  const [showAllServices, setShowAllServices] = useState(false)
  const [lastUpdate, setLastUpdate] = useState('Ahora')
  const [chartView, setChartView] = useState(true)

  // =====================================================
  // REGIÓN SELECCIONADA
  // =====================================================

  const [selectedRegionId, setSelectedRegionId] = useState<string>(
    regions[0]?.code ?? '',
  )

  const selectedRegion =
    regions.find((region) => region.code === selectedRegionId) ?? regions[0]

  // =====================================================
  // ACTUALIZAR INFORMACIÓN
  // =====================================================

  const handleRefresh = () => {
    const now = new Date()

    setLastUpdate(
      now.toLocaleTimeString('es-PE', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    )
  }

  // =====================================================
  // CÁLCULO DE COSTOS
  // =====================================================

  const totalMonthly = costEstimates.reduce(
    (sum, cost) => sum + cost.monthlyCost,
    0,
  )

  const totalAnnual = costEstimates.reduce(
    (sum, cost) => sum + cost.annualCost,
    0,
  )

  // =====================================================
  // GRÁFICO
  // =====================================================

  const barData = costEstimates.map((cost) => ({
    name: cost.serviceName,
    value: Number(cost.monthlyCost.toFixed(2)),
  }))

  // =====================================================
  // SEGURIDAD
  // =====================================================

  const totalSecurity = securityItems.length || 1

  const okCount = securityItems.filter(
    (item) => item.status === 'ok',
  ).length

  const warningCount = securityItems.filter(
    (item) => item.status === 'warning',
  ).length

  const errorCount = securityItems.filter(
    (item) => item.status === 'error',
  ).length

  const securityScore = Math.round(
    (okCount / totalSecurity) * 100,
  )

  const securityStatus =
    errorCount > 0
      ? 'error'
      : warningCount > 0
        ? 'warning'
        : 'ok'

  // =====================================================
  // RECURSOS CLOUD
  // =====================================================

  const cloudResources = regions.reduce(
    (total, region) =>
      total + (region.deployedServices?.length || 0),
    0,
  )

  // =====================================================
  // ARQUITECTURA
  // =====================================================

  const requiredArchitectureServices = [
    'route53',
    'cloudfront',
    'vpc',
    'ec2',
    'rds',
  ]

  const architectureReady =
    requiredArchitectureServices.every((serviceId) =>
      awsServices.some((service) => service.id === serviceId),
    )

  const architectureStatus = architectureReady
    ? 'Operativa'
    : 'Pendiente'

  // =====================================================
  // FILTRO DE SERVICIOS
  // =====================================================

  const filteredServices = useMemo(() => {
    const search = searchService.toLowerCase().trim()

    if (!search) {
      return showAllServices
        ? awsServices
        : awsServices.slice(0, 3)
    }

    return awsServices.filter(
      (service) =>
        service.name.toLowerCase().includes(search) ||
        service.category.toLowerCase().includes(search),
    )
  }, [searchService, showAllServices])

  // =====================================================
  // RECOMENDACIONES DE SEGURIDAD
  // =====================================================

  const securityAttention = securityItems.filter(
    (item) =>
      item.status === 'warning' ||
      item.status === 'error',
  ).length

  return (
    <div className="space-y-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* =====================================================
            ENCABEZADO
        ===================================================== */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <LayoutDashboard className="w-7 h-7 text-primary" />

              <h1 className="text-main-title">
                CloudOps Dashboard
              </h1>
            </div>

            <p className="text-muted mt-1">
              Panel general para la planificación,
              visualización y monitoreo de la solución Cloud.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">

            <button
              type="button"
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-white text-sm font-medium hover:bg-slate-50 transition"
            >
              <RefreshCw className="w-4 h-4" />
              Actualizar
            </button>

            <button
              type="button"
              onClick={() => navigate('/planning')}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition"
            >
              <Plus className="w-4 h-4" />
              Nueva planificación
            </button>

          </div>
        </div>

        {/* =====================================================
            ESTADO DE ACTUALIZACIÓN
        ===================================================== */}

        <div className="flex items-center gap-2 text-xs text-muted">
          <Clock3 className="w-4 h-4" />
          Última actualización: {lastUpdate}
        </div>

        {/* =====================================================
            INDICADORES PRINCIPALES
        ===================================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          <StatCard
            title="Servicios utilizados"
            value={awsServices.length}
            subtitle="Servicios AWS registrados"
          />

          {/* REGIÓN SELECCIONADA */}
          <div className="card p-4">
            <div className="text-sm text-muted">
              Región seleccionada
            </div>

            <select
              value={selectedRegionId}
              onChange={(event) =>
                setSelectedRegionId(event.target.value)
              }
              className="w-full mt-2 text-xl font-bold text-main bg-transparent border-0 outline-none cursor-pointer"
            >
              {regions.map((region) => (
                <option
                  key={region.code}
                  value={region.code}
                >
                  {region.code}
                </option>
              ))}
            </select>

            <div className="text-sm text-muted mt-1">
              {selectedRegion?.location ??
                'Sin región seleccionada'}
            </div>
          </div>

          <StatCard
            title="Costo mensual estimado"
            value={`$${totalMonthly.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
            subtitle="Estimación mensual"
          />

          <StatCard
            title="Costo anual estimado"
            value={`$${totalAnnual.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
            subtitle="Proyección a 12 meses"
          />

        </div>

        {/* =====================================================
            ESTADO GENERAL
        ===================================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* SEGURIDAD */}

          <div className="card p-5">

            <div className="flex items-center justify-between">
              <div className="text-xs text-muted font-medium uppercase tracking-wider">
                Estado de seguridad
              </div>

              <ShieldCheck className="w-5 h-5 text-security" />
            </div>

            <div className="text-3xl font-bold mt-2 text-main">
              {securityScore}%
            </div>

            <div className="flex items-center gap-2 mt-2 text-xs">

              <span className="text-security">
                {okCount} correctos
              </span>

              {warningCount > 0 && (
                <span className="text-costs">
                  {warningCount} por revisar
                </span>
              )}

              {errorCount > 0 && (
                <span className="text-alerts">
                  {errorCount} alertas
                </span>
              )}

            </div>

          </div>

          {/* RECURSOS CLOUD */}

          <div className="card p-5">

            <div className="flex items-center justify-between">
              <div className="text-xs text-muted font-medium uppercase tracking-wider">
                Recursos Cloud
              </div>

              <Server className="w-5 h-5 text-primary" />
            </div>

            <div className="text-3xl font-bold mt-2 text-main">
              {cloudResources}
            </div>

            <div className="text-xs text-muted mt-1">
              Recursos registrados en las regiones
            </div>

          </div>

          {/* ARQUITECTURA */}

          <div className="card p-5">

            <div className="flex items-center justify-between">

              <div className="text-xs text-muted font-medium uppercase tracking-wider">
                Estado de arquitectura
              </div>

              <Activity
                className={`w-5 h-5 ${
                  architectureReady
                    ? 'text-security'
                    : 'text-costs'
                }`}
              />

            </div>

            <div
              className={`text-2xl font-bold mt-2 ${
                architectureReady
                  ? 'text-security'
                  : 'text-costs'
              }`}
            >
              {architectureStatus}
            </div>

            <div className="text-xs text-muted mt-1">
              Internet → Route 53 → CloudFront → VPC
            </div>

          </div>

        </div>

        {/* =====================================================
            ACCIONES RÁPIDAS
        ===================================================== */}

        <section className="space-y-3">

          <h2 className="text-base font-semibold text-main">
            Acciones rápidas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <button
              type="button"
              onClick={() => navigate('/planning')}
              className="card p-5 text-left hover:border-primary hover:shadow-sm transition"
            >

              <div className="flex items-center justify-between">

                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Plus className="w-5 h-5 text-primary" />
                </div>

                <ArrowRight className="w-4 h-4 text-muted" />

              </div>

              <h3 className="font-semibold text-main mt-4">
                Nueva planificación
              </h3>

              <p className="text-sm text-muted mt-1">
                Registrar una nueva propuesta cloud.
              </p>

            </button>

            <button
              type="button"
              onClick={() => navigate('/costs')}
              className="card p-5 text-left hover:border-primary hover:shadow-sm transition"
            >

              <div className="flex items-center justify-between">

                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-costs" />
                </div>

                <ArrowRight className="w-4 h-4 text-muted" />

              </div>

              <h3 className="font-semibold text-main mt-4">
                Revisar costos
              </h3>

              <p className="text-sm text-muted mt-1">
                Consultar y modificar las estimaciones.
              </p>

            </button>

            <button
              type="button"
              onClick={() => navigate('/network')}
              className="card p-5 text-left hover:border-primary hover:shadow-sm transition"
            >

              <div className="flex items-center justify-between">

                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                  <Network className="w-5 h-5 text-security" />
                </div>

                <ArrowRight className="w-4 h-4 text-muted" />

              </div>

              <h3 className="font-semibold text-main mt-4">
                Ver arquitectura
              </h3>

              <p className="text-sm text-muted mt-1">
                Revisar la arquitectura de red.
              </p>

            </button>

          </div>

        </section>

        {/* =====================================================
            GRÁFICO Y SEGURIDAD
        ===================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* GRÁFICO */}

          <div className="card p-5 lg:col-span-2">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">

              <div>
                <h2 className="font-semibold text-main text-base">
                  Distribución de costos por servicio
                </h2>

                <p className="text-xs text-muted mt-1">
                  Valores estimados en dólares USD.
                </p>
              </div>

              <div className="flex items-center gap-2">

                <button
                  type="button"
                  onClick={() => setChartView(true)}
                  className={`px-3 py-1.5 text-xs rounded-md ${
                    chartView
                      ? 'bg-primary text-white'
                      : 'bg-slate-100 text-muted'
                  }`}
                >
                  Gráfico
                </button>

                <button
                  type="button"
                  onClick={() => setChartView(false)}
                  className={`px-3 py-1.5 text-xs rounded-md ${
                    !chartView
                      ? 'bg-primary text-white'
                      : 'bg-slate-100 text-muted'
                  }`}
                >
                  Resumen
                </button>

              </div>

            </div>

            {chartView ? (

              <div className="w-full h-[280px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <BarChart
                    data={barData}
                    margin={{
                      top: 10,
                      right: 10,
                      left: -20,
                      bottom: 0,
                    }}
                  >

                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#E2E8F0"
                    />

                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 11 }}
                    />

                    <YAxis
                      tick={{ fontSize: 11 }}
                    />

                    <Tooltip />

                    <Bar
                      dataKey="value"
                      fill="#2563EB"
                      radius={[4, 4, 0, 0]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            ) : (

              <div className="space-y-3">

                {barData.map((item) => (

                  <div
                    key={item.name}
                    className="flex items-center justify-between border-b border-border pb-3"
                  >

                    <span className="text-sm text-main">
                      {item.name}
                    </span>

                    <span className="font-semibold text-main">
                      ${item.value.toFixed(2)}
                    </span>

                  </div>

                ))}

              </div>

            )}

          </div>

          {/* SEGURIDAD */}

          <div className="space-y-4">

            <SecurityCard
              title="Estado de seguridad"
              score={securityScore}
              status={securityStatus}
            />

            <SecurityList items={securityItems} />

            {securityAttention > 0 && (

              <div className="card p-4 border-amber-200">

                <div className="flex items-start gap-3">

                  <ShieldCheck className="w-5 h-5 text-costs mt-0.5" />

                  <div>

                    <div className="font-semibold text-main text-sm">
                      Revisión recomendada
                    </div>

                    <p className="text-xs text-muted mt-1">
                      Hay {securityAttention} control(es)
                      que requieren atención.
                    </p>

                    <button
                      type="button"
                      onClick={() => navigate('/security')}
                      className="text-primary text-xs font-medium mt-2 hover:underline"
                    >
                      Revisar seguridad
                    </button>

                  </div>

                </div>

              </div>

            )}

          </div>

        </div>

        {/* =====================================================
            SERVICIOS DESTACADOS
        ===================================================== */}

        <section className="space-y-3">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

            <div>
              <h2 className="text-base font-semibold text-main">
                Servicios AWS
              </h2>

              <p className="text-xs text-muted mt-1">
                Consulta rápida de los servicios registrados.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setShowAllServices((current) => !current)
              }
              className="flex items-center gap-2 text-sm text-primary font-medium hover:underline"
            >
              <Eye className="w-4 h-4" />

              {showAllServices
                ? 'Mostrar menos'
                : 'Ver todos'}
            </button>

          </div>

          {/* BUSCADOR */}

          <div className="relative max-w-md">

            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />

            <input
              type="search"
              value={searchService}
              onChange={(event) =>
                setSearchService(event.target.value)
              }
              placeholder="Buscar servicio AWS..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-white text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {filteredServices.map((service) => (

              <ServiceCard
                key={service.id}
                service={service}
              />

            ))}

          </div>

          {filteredServices.length === 0 && (

            <div className="card p-8 text-center">

              <Search className="w-8 h-8 mx-auto text-muted" />

              <p className="text-sm text-muted mt-2">
                No se encontraron servicios.
              </p>

            </div>

          )}

        </section>

        {/* =====================================================
            INFRAESTRUCTURA GLOBAL
        ===================================================== */}

        <section className="space-y-3">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-base font-semibold text-main">
                Infraestructura global
              </h2>

              <p className="text-xs text-muted mt-1">
                Regiones disponibles para la solución.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate('/infrastructure')}
              className="text-sm text-primary font-medium hover:underline"
            >
              Ver infraestructura
            </button>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {regions.map((region) => (

              <RegionCard
                key={region.id}
                region={region}
              />

            ))}

          </div>

        </section>

        {/* =====================================================
            ESTADO FINAL
        ===================================================== */}

        <div className="card p-5">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-security" />
              </div>

              <div>

                <div className="font-semibold text-main">
                  Estado general de la solución
                </div>

                <div className="text-sm text-muted">
                  Los módulos principales se encuentran disponibles.
                </div>

              </div>

            </div>

            <button
              type="button"
              onClick={() => navigate('/services')}
              className="flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-slate-50 transition"
            >
              Revisar servicios
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Dashboard