import React, { useMemo, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  Calculator,
  Clock,
  DollarSign,
  Plus,
  RotateCcw,
  Server,
  Trash2,
  TrendingUp,
} from 'lucide-react'

import CostCard from '../components/CostCard'
import { awsServices } from '../data/awsServices'

type CostRow = {
  id: string
  serviceName: string
  quantity: number
  estimatedHours: number
  estimatedCost: number
}

const Costs = (): JSX.Element => {
  // =====================================================
  // ESTADO
  // =====================================================

  // IMPORTANTE:
  // El módulo comienza vacío.
  // Los servicios aparecen solamente cuando el usuario
  // los selecciona y presiona "Agregar servicio".
  const [rows, setRows] = useState<CostRow[]>([])

  const [selectedService, setSelectedService] = useState('')

  const [chartView, setChartView] = useState<'monthly' | 'annual'>(
    'monthly',
  )

  const [message, setMessage] = useState('')

  // =====================================================
  // SERVICIOS DISPONIBLES
  // =====================================================

  // Muestra solamente servicios que todavía no fueron agregados.
  const availableServices = useMemo(
    () =>
      awsServices.filter(
        (service) =>
          !rows.some(
            (row) =>
              row.serviceName.toLowerCase() ===
              service.name.toLowerCase(),
          ),
      ),
    [rows],
  )

  // =====================================================
  // AGREGAR SERVICIO
  // =====================================================

  const addService = () => {
    if (!selectedService) {
      setMessage(
        'Selecciona un servicio AWS antes de agregarlo.',
      )
      return
    }

    const service = awsServices.find(
      (item) => item.id === selectedService,
    )

    if (!service) {
      setMessage(
        'No se encontró el servicio seleccionado.',
      )
      return
    }

    const alreadyExists = rows.some(
      (row) =>
        row.serviceName.toLowerCase() ===
        service.name.toLowerCase(),
    )

    if (alreadyExists) {
      setMessage(
        `${service.name} ya está incluido en la estimación.`,
      )
      return
    }

    const newRow: CostRow = {
      id: `${service.id}-${Date.now()}`,
      serviceName: service.name,
      quantity: 1,
      estimatedHours: 720,
      estimatedCost: 0.05,
    }

    setRows((current) => [...current, newRow])

    setSelectedService('')

    setMessage(
      `${service.name} fue agregado correctamente.`,
    )
  }

  // =====================================================
  // ACTUALIZAR FILA
  // =====================================================

  const updateRow = (
    id: string,
    field: keyof Pick<
      CostRow,
      'quantity' | 'estimatedHours' | 'estimatedCost'
    >,
    value: number,
  ) => {
    const safeValue =
      Number.isFinite(value) && value >= 0 ? value : 0

    setRows((current) =>
      current.map((row) =>
        row.id === id
          ? {
              ...row,
              [field]: safeValue,
            }
          : row,
      ),
    )

    setMessage('')
  }

  // =====================================================
  // ELIMINAR SERVICIO
  // =====================================================

  const removeRow = (id: string) => {
    const removed = rows.find(
      (row) => row.id === id,
    )

    setRows((current) =>
      current.filter((row) => row.id !== id),
    )

    if (removed) {
      setMessage(
        `${removed.serviceName} fue eliminado de la estimación.`,
      )
    }
  }

  // =====================================================
  // RESTABLECER
  // =====================================================

  const resetCosts = () => {
    // Restablecer significa comenzar nuevamente desde cero.
    setRows([])
    setSelectedService('')
    setChartView('monthly')

    setMessage(
      'Estimación restablecida correctamente.',
    )
  }

  // =====================================================
  // CÁLCULO DE COSTOS
  // =====================================================

  const calculatedRows = useMemo(() => {
    return rows.map((row) => {
      const monthlyCost =
        row.quantity *
        row.estimatedHours *
        row.estimatedCost

      const annualCost = monthlyCost * 12

      return {
        ...row,
        monthlyCost,
        annualCost,
      }
    })
  }, [rows])

  // =====================================================
  // TOTALES
  // =====================================================

  const totalMonthly = calculatedRows.reduce(
    (total, row) =>
      total + row.monthlyCost,
    0,
  )

  const totalAnnual = calculatedRows.reduce(
    (total, row) =>
      total + row.annualCost,
    0,
  )

  const totalResources = calculatedRows.reduce(
    (total, row) =>
      total + row.quantity,
    0,
  )

  const averageMonthly =
    calculatedRows.length > 0
      ? totalMonthly / calculatedRows.length
      : 0

  // =====================================================
  // SERVICIO DE MAYOR COSTO
  // =====================================================

  const highestCostService = useMemo(() => {
    if (calculatedRows.length === 0) {
      return null
    }

    return [...calculatedRows].sort(
      (a, b) =>
        b.monthlyCost - a.monthlyCost,
    )[0]
  }, [calculatedRows])

  // =====================================================
  // DATOS DEL GRÁFICO
  // =====================================================

  const chartData = calculatedRows.map(
    (row) => ({
      name: row.serviceName,
      costo:
        chartView === 'monthly'
          ? Number(
              row.monthlyCost.toFixed(2),
            )
          : Number(
              row.annualCost.toFixed(2),
            ),
    }),
  )

  const chartLabel =
    chartView === 'monthly'
      ? 'Costo mensual'
      : 'Costo anual'

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="space-y-4">
      <div className="max-w-7xl mx-auto space-y-4">

        {/* =================================================
            ENCABEZADO
        ================================================= */}

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">

          <div>
            <h1 className="text-main-title">
              Costos y economía Cloud
            </h1>

            <p className="text-muted mt-1">
              Estimación simulada de costos mensuales y
              anuales de los servicios Cloud considerados.
            </p>
          </div>

          <button
            type="button"
            onClick={resetCosts}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-white text-main text-sm font-medium hover:bg-background transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Restablecer
          </button>

        </div>

        {/* =================================================
            MENSAJE
        ================================================= */}

        {message && (
          <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-primary">
            {message}
          </div>
        )}

        {/* =================================================
            INDICADORES
        ================================================= */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">

          {/* Costo mensual */}

          <CostCard
            title="Costo mensual estimado"
            monthly={totalMonthly}
            annual={totalAnnual}
          />

          {/* Costo anual */}

          <div className="card p-5">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-amber-500" />
              </div>

              <div>

                <div className="text-sm text-muted">
                  Costo anual estimado
                </div>

                <div className="text-2xl font-bold text-main mt-1">
                  ${totalAnnual.toFixed(2)}
                </div>

              </div>

            </div>

            <p className="text-sm text-muted mt-4">
              Proyección estimada para 12 meses.
            </p>

          </div>

          {/* Recursos */}

          <div className="card p-5">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Server className="w-5 h-5 text-primary" />
              </div>

              <div>

                <div className="text-sm text-muted">
                  Recursos estimados
                </div>

                <div className="text-2xl font-bold text-main mt-1">
                  {totalResources}
                </div>

              </div>

            </div>

            <p className="text-sm text-muted mt-4">
              Cantidad total de recursos configurados.
            </p>

          </div>

          {/* Promedio */}

          <div className="card p-5">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-lg bg-security/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-security" />
              </div>

              <div>

                <div className="text-sm text-muted">
                  Promedio mensual
                </div>

                <div className="text-2xl font-bold text-main mt-1">
                  ${averageMonthly.toFixed(2)}
                </div>

              </div>

            </div>

            <p className="text-sm text-muted mt-4">
              Promedio por servicio incluido.
            </p>

          </div>

        </div>

        {/* =================================================
            AGREGAR SERVICIO
        ================================================= */}

        <section className="card p-4 md:p-5">

          <div className="flex items-start gap-3 mb-5">

            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Calculator className="w-5 h-5 text-primary" />
            </div>

            <div>

              <h2 className="text-lg font-semibold text-main">
                Agregar servicio Cloud
              </h2>

              <p className="text-sm text-muted mt-1">
                Selecciona un servicio AWS para incluirlo
                en la estimación de costos.
              </p>

            </div>

          </div>

          <div className="flex flex-col md:flex-row gap-2">

            <div className="flex-1">

              <label
                htmlFor="service"
                className="block text-sm font-medium text-main mb-2"
              >
                Selección del servicio
              </label>

              <select
                id="service"
                value={selectedService}
                onChange={(event) => {
                  setSelectedService(
                    event.target.value,
                  )
                  setMessage('')
                }}
                className="w-full px-3 py-2.5 border border-border rounded-lg bg-white text-main outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >

                <option value="">
                  Selecciona un servicio AWS
                </option>

                {availableServices.map(
                  (service) => (
                    <option
                      key={service.id}
                      value={service.id}
                    >
                      {service.name} —{' '}
                      {service.category}
                    </option>
                  ),
                )}

              </select>

              {availableServices.length === 0 && (
                <p className="text-xs text-muted mt-2">
                  Todos los servicios disponibles ya
                  están incluidos en la estimación.
                </p>
              )}

            </div>

            <div className="flex items-end">

              <button
                type="button"
                onClick={addService}
                disabled={!selectedService}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Plus className="w-4 h-4" />
                Agregar servicio
              </button>

            </div>

          </div>

        </section>

        {/* =================================================
            ESTIMACIÓN DE COSTOS
        ================================================= */}

        <section className="card p-4 md:p-5">

          <div className="mb-5">

            <h2 className="text-lg font-semibold text-main">
              Estimación de costos
            </h2>

            <p className="text-sm text-muted mt-1">
              Configura cantidad, horas estimadas y costo
              por hora para cada servicio.
            </p>

          </div>

          {calculatedRows.length === 0 ? (

            <div className="border border-dashed border-border rounded-lg p-10 text-center">

              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Server className="w-6 h-6 text-primary" />
              </div>

              <p className="font-semibold text-main">
                No hay servicios agregados
              </p>

              <p className="text-sm text-muted mt-1 max-w-md mx-auto">
                Selecciona un servicio AWS en la sección
                superior y presiona "Agregar servicio"
                para comenzar la estimación.
              </p>

            </div>

          ) : (

            <div className="space-y-3">

              {calculatedRows.map(
                (row) => {

                  const percentage =
                    totalMonthly > 0
                      ? (row.monthlyCost /
                          totalMonthly) *
                        100
                      : 0

                  return (
                    <div
                      key={row.id}
                      className="border border-border rounded-xl p-4 bg-white hover:shadow-sm transition-shadow"
                    >

                      {/* CABECERA */}

                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">

                        <div className="flex items-center gap-3">

                          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Server className="w-4 h-4 text-primary" />
                          </div>

                          <div>

                            <div className="font-semibold text-main">
                              {row.serviceName}
                            </div>

                            <div className="text-xs text-muted">
                              Servicio Cloud ·{' '}
                              {percentage.toFixed(
                                1,
                              )}
                              % del costo mensual
                            </div>

                          </div>

                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            removeRow(row.id)
                          }
                          className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-border text-sm text-alerts hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          Eliminar
                        </button>

                      </div>

                      {/* CAMPOS */}

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">

                        {/* CANTIDAD */}

                        <div>

                          <label
                            htmlFor={`quantity-${row.id}`}
                            className="block text-xs font-medium text-muted mb-2"
                          >
                            Cantidad
                          </label>

                          <input
                            id={`quantity-${row.id}`}
                            type="number"
                            min="0"
                            step="1"
                            value={row.quantity}
                            onChange={(event) =>
                              updateRow(
                                row.id,
                                'quantity',
                                Number(
                                  event.target.value,
                                ),
                              )
                            }
                            className="w-full px-3 py-2.5 border border-border rounded-lg bg-white text-main outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          />

                        </div>

                        {/* HORAS */}

                        <div>

                          <label
                            htmlFor={`hours-${row.id}`}
                            className="block text-xs font-medium text-muted mb-2"
                          >
                            Horas estimadas
                          </label>

                          <div className="relative">

                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />

                            <input
                              id={`hours-${row.id}`}
                              type="number"
                              min="0"
                              step="1"
                              value={
                                row.estimatedHours
                              }
                              onChange={(event) =>
                                updateRow(
                                  row.id,
                                  'estimatedHours',
                                  Number(
                                    event.target.value,
                                  ),
                                )
                              }
                              className="w-full pl-9 pr-3 py-2.5 border border-border rounded-lg bg-white text-main outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />

                          </div>

                        </div>

                        {/* COSTO POR HORA */}

                        <div>

                          <label
                            htmlFor={`cost-${row.id}`}
                            className="block text-xs font-medium text-muted mb-2"
                          >
                            Costo estimado / hora
                          </label>

                          <div className="relative">

                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm">
                              $
                            </span>

                            <input
                              id={`cost-${row.id}`}
                              type="number"
                              min="0"
                              step="0.001"
                              value={
                                row.estimatedCost
                              }
                              onChange={(event) =>
                                updateRow(
                                  row.id,
                                  'estimatedCost',
                                  Number(
                                    event.target.value,
                                  ),
                                )
                              }
                              className="w-full pl-7 pr-3 py-2.5 border border-border rounded-lg bg-white text-main outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />

                          </div>

                        </div>

                        {/* MENSUAL */}

                        <div className="rounded-lg bg-amber-50 border border-amber-100 p-3">

                          <div className="text-xs font-medium text-muted">
                            Costo mensual
                          </div>

                          <div className="text-lg font-bold text-main mt-1">
                            $
                            {row.monthlyCost.toFixed(
                              2,
                            )}
                          </div>

                        </div>

                        {/* ANUAL */}

                        <div className="rounded-lg bg-slate-50 border border-border p-3">

                          <div className="text-xs font-medium text-muted">
                            Costo anual
                          </div>

                          <div className="text-lg font-bold text-main mt-1">
                            $
                            {row.annualCost.toFixed(
                              2,
                            )}
                          </div>

                        </div>

                      </div>

                      {/* PARTICIPACIÓN */}

                      <div className="mt-3">

                        <div className="flex justify-between text-xs text-muted mb-1">

                          <span>
                            Participación en el costo
                            mensual
                          </span>

                          <span>
                            {percentage.toFixed(1)}%
                          </span>

                        </div>

                        <div className="w-full h-2 bg-background rounded-full overflow-hidden">

                          <div
                            className="h-2 bg-primary rounded-full transition-all"
                            style={{
                              width: `${Math.min(
                                percentage,
                                100,
                              )}%`,
                            }}
                          />

                        </div>

                      </div>

                      {/* FÓRMULA */}

                      <div className="mt-3 pt-2 border-t border-border">

                        <p className="text-xs text-muted">

                          Cálculo mensual:{' '}

                          {row.quantity} ×{' '}

                          {row.estimatedHours}{' '}
                          horas × $

                          {row.estimatedCost.toFixed(
                            3,
                          )}

                          {' / hora = '}

                          <span className="font-semibold text-main">
                            $
                            {row.monthlyCost.toFixed(
                              2,
                            )}
                          </span>

                        </p>

                      </div>

                    </div>
                  )
                },
              )}

            </div>

          )}

        </section>

        {/* =================================================
            RESUMEN TOTAL
        ================================================= */}

        <section className="card p-4 md:p-5">

          <div className="flex items-center gap-3 mb-3">

            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>

            <div>

              <h2 className="text-lg font-semibold text-main">
                Resumen de costos
              </h2>

              <p className="text-sm text-muted mt-1">
                Resumen de la estimación actual.
              </p>

            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

            <div className="rounded-xl border border-border p-5">

              <div className="text-sm text-muted">
                Costo mensual total
              </div>

              <div className="text-3xl font-bold text-main mt-2">
                ${totalMonthly.toFixed(2)}
              </div>

              <p className="text-sm text-muted mt-2">
                Estimación mensual de todos los
                servicios.
              </p>

            </div>

            <div className="rounded-xl border border-border p-5">

              <div className="text-sm text-muted">
                Costo anual total
              </div>

              <div className="text-3xl font-bold text-main mt-2">
                ${totalAnnual.toFixed(2)}
              </div>

              <p className="text-sm text-muted mt-2">
                Proyección de los costos durante 12
                meses.
              </p>

            </div>

            <div className="rounded-xl border border-border p-5">

              <div className="text-sm text-muted">
                Mayor costo mensual
              </div>

              <div className="text-xl font-bold text-main mt-2">
                {highestCostService?.serviceName ??
                  'N/D'}
              </div>

              <p className="text-sm text-muted mt-2">
                {highestCostService
                  ? `$${highestCostService.monthlyCost.toFixed(
                      2,
                    )} mensuales`
                  : 'Sin servicios registrados.'}
              </p>

            </div>

          </div>

        </section>

        {/* =================================================
            GRÁFICO DE DISTRIBUCIÓN
        ================================================= */}

        <section className="card p-4 md:p-5">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

            <div>

              <h2 className="text-lg font-semibold text-main">
                Distribución de costos
              </h2>

              <p className="text-sm text-muted mt-1">
                Comparación de costos estimados por
                servicio.
              </p>

            </div>

            <div className="flex gap-2">

              <button
                type="button"
                onClick={() =>
                  setChartView('monthly')
                }
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
                onClick={() =>
                  setChartView('annual')
                }
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

          <div
            className="mt-3"
            style={{
              width: '100%',
              height: 260,
            }}
          >

            {chartData.length > 0 ? (

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart
                  data={chartData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 10,
                  }}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="name"
                    tick={{
                      fontSize: 12,
                    }}
                  />

                  <YAxis
                    tick={{
                      fontSize: 12,
                    }}
                  />

                  <Tooltip
                    formatter={(value) =>
                      `$${Number(value).toFixed(
                        2,
                      )}`
                    }
                  />

                  <Bar
                    dataKey="costo"
                    name={chartLabel}
                    fill="#2563EB"
                    radius={[
                      6,
                      6,
                      0,
                      0,
                    ]}
                  />

                </BarChart>

              </ResponsiveContainer>

            ) : (

              <div className="h-full flex items-center justify-center text-sm text-muted border border-dashed border-border rounded-lg">

                No hay datos para mostrar.
                <span className="ml-1">
                  Agrega servicios para visualizar
                  el gráfico.
                </span>

              </div>

            )}

          </div>

        </section>

        {/* =================================================
            TABLA RESUMEN
        ================================================= */}

        <section className="card p-4 md:p-5">

          <div className="mb-5">

            <h2 className="text-lg font-semibold text-main">
              Resumen por servicio
            </h2>

            <p className="text-sm text-muted mt-1">
              Vista general de los valores utilizados
              en la estimación.
            </p>

          </div>

          {calculatedRows.length === 0 ? (

            <div className="border border-dashed border-border rounded-lg p-8 text-center">

              <p className="text-sm text-muted">
                La tabla aparecerá cuando agregues
                servicios.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full min-w-[700px] text-sm">

                <thead>

                  <tr className="border-b border-border text-left">

                    <th className="py-3 px-3 font-semibold text-main">
                      Servicio
                    </th>

                    <th className="py-3 px-3 font-semibold text-main">
                      Cantidad
                    </th>

                    <th className="py-3 px-3 font-semibold text-main">
                      Horas
                    </th>

                    <th className="py-3 px-3 font-semibold text-main">
                      Costo / hora
                    </th>

                    <th className="py-3 px-3 font-semibold text-main">
                      Mensual
                    </th>

                    <th className="py-3 px-3 font-semibold text-main">
                      Anual
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {calculatedRows.map(
                    (row) => (
                      <tr
                        key={`summary-${row.id}`}
                        className="border-b border-border last:border-0"
                      >

                        <td className="py-3 px-3 font-medium text-main">
                          {row.serviceName}
                        </td>

                        <td className="py-3 px-3 text-muted">
                          {row.quantity}
                        </td>

                        <td className="py-3 px-3 text-muted">
                          {row.estimatedHours}
                        </td>

                        <td className="py-3 px-3 text-muted">
                          $
                          {row.estimatedCost.toFixed(
                            3,
                          )}
                        </td>

                        <td className="py-3 px-3 font-semibold text-main">
                          $
                          {row.monthlyCost.toFixed(
                            2,
                          )}
                        </td>

                        <td className="py-3 px-3 font-semibold text-main">
                          $
                          {row.annualCost.toFixed(
                            2,
                          )}
                        </td>

                      </tr>
                    ),
                  )}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </div>
    </div>
  )
}

export default Costs