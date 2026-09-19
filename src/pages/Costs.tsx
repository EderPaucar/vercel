import React, { useMemo, useState } from 'react'
import {
  Bar,
  BarChart,
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
  Server,
  Trash2,
} from 'lucide-react'
import CostCard from '../components/CostCard'
import { awsServices, costEstimates } from '../data/awsServices'

type CostRow = {
  id: string
  serviceName: string
  quantity: number
  estimatedHours: number
  estimatedCost: number
}

const Costs = (): JSX.Element => {
  // =====================================================
  // ESTADO DE LOS SERVICIOS
  // =====================================================

  const [rows, setRows] = useState<CostRow[]>(
    costEstimates.map((item) => ({
      id: item.id,
      serviceName: item.serviceName,
      quantity: item.quantity,
      estimatedHours: item.estimatedHours,
      estimatedCost: item.estimatedCost,
    })),
  )

  const [selectedService, setSelectedService] = useState('')

  // =====================================================
  // AGREGAR SERVICIO
  // =====================================================

  const addService = () => {
    if (!selectedService) {
      return
    }

    const service = awsServices.find(
      (item) => item.id === selectedService,
    )

    if (!service) {
      return
    }

    const alreadyExists = rows.some(
      (row) => row.serviceName === service.name,
    )

    if (alreadyExists) {
      return
    }

    setRows((current) => [
      ...current,
      {
        id: `${service.id}-${Date.now()}`,
        serviceName: service.name,
        quantity: 1,
        estimatedHours: 720,
        estimatedCost: 0.05,
      },
    ])

    setSelectedService('')
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
    setRows((current) =>
      current.map((row) =>
        row.id === id
          ? {
              ...row,
              [field]: Math.max(0, value),
            }
          : row,
      ),
    )
  }

  // =====================================================
  // ELIMINAR SERVICIO
  // =====================================================

  const removeRow = (id: string) => {
    setRows((current) =>
      current.filter((row) => row.id !== id),
    )
  }

  // =====================================================
  // CÁLCULO DE COSTOS
  // =====================================================

  const calculatedRows = useMemo(() => {
    return rows.map((row) => {
      /*
       * Costo mensual:
       * cantidad × horas estimadas × costo por hora
       */

      const monthlyCost =
        row.quantity *
        row.estimatedHours *
        row.estimatedCost

      /*
       * Costo anual:
       * costo mensual × 12 meses
       */

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
    (total, row) => total + row.monthlyCost,
    0,
  )

  const totalAnnual = calculatedRows.reduce(
    (total, row) => total + row.annualCost,
    0,
  )

  // =====================================================
  // DATOS DEL GRÁFICO
  // =====================================================

  const chartData = calculatedRows.map((row) => ({
    name: row.serviceName,
    costo: Number(row.monthlyCost.toFixed(2)),
  }))

  return (
    <div className="space-y-6">
      <div className="max-w-7xl mx-auto">

        {/* =================================================
            ENCABEZADO
        ================================================= */}

        <div>
          <h1 className="text-main-title">
            Costos y economía Cloud
          </h1>

          <p className="text-muted mt-1">
            Estimación simulada de costos mensuales y anuales
            de los servicios Cloud.
          </p>
        </div>

        {/* =================================================
            INDICADORES DE COSTOS
        ================================================= */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

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

          {/* Servicios */}

          <div className="card p-5">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Server className="w-5 h-5 text-primary" />
              </div>

              <div>
                <div className="text-sm text-muted">
                  Servicios estimados
                </div>

                <div className="text-2xl font-bold text-main mt-1">
                  {calculatedRows.length}
                </div>
              </div>

            </div>

            <p className="text-sm text-muted mt-4">
              Servicios incluidos en la estimación.
            </p>

          </div>

        </div>

        {/* =================================================
            SELECCIÓN DE SERVICIO
        ================================================= */}

        <section className="card p-5 md:p-6 mt-4">

          <div className="flex items-start gap-3 mb-5">

            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Calculator className="w-5 h-5 text-primary" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-main">
                Agregar servicio Cloud
              </h2>

              <p className="text-sm text-muted mt-1">
                Selecciona un servicio AWS para incluirlo en
                la estimación.
              </p>
            </div>

          </div>

          <div className="flex flex-col md:flex-row gap-3">

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
                onChange={(event) =>
                  setSelectedService(event.target.value)
                }
                className="w-full px-3 py-2.5 border border-border rounded-lg bg-white text-main outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="">
                  Selecciona un servicio AWS
                </option>

                {awsServices.map((service) => (
                  <option
                    key={service.id}
                    value={service.id}
                  >
                    {service.name} — {service.category}
                  </option>
                ))}
              </select>

            </div>

            <div className="flex items-end">

              <button
                type="button"
                onClick={addService}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Agregar servicio
              </button>

            </div>

          </div>

        </section>

        {/* =================================================
            TABLA / LISTA DE COSTOS
        ================================================= */}

        <section className="card p-5 md:p-6">

          <div className="mb-5">

            <h2 className="text-lg font-semibold text-main">
              Estimación de costos
            </h2>

            <p className="text-sm text-muted mt-1">
              Configura cantidad, horas y costo estimado para
              cada servicio.
            </p>

          </div>

          {calculatedRows.length === 0 ? (

            <div className="border border-dashed border-border rounded-lg p-8 text-center">

              <Server className="w-8 h-8 text-muted mx-auto mb-3" />

              <p className="font-medium text-main">
                No hay servicios agregados
              </p>

              <p className="text-sm text-muted mt-1">
                Selecciona un servicio para comenzar la
                estimación.
              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {calculatedRows.map((row) => (

                <div
                  key={row.id}
                  className="border border-border rounded-xl p-4 bg-white"
                >

                  {/* =================================================
                      CABECERA DEL SERVICIO
                  ================================================= */}

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">

                    <div className="flex items-center gap-3">

                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Server className="w-4 h-4 text-primary" />
                      </div>

                      <div>
                        <div className="font-semibold text-main">
                          {row.serviceName}
                        </div>

                        <div className="text-xs text-muted">
                          Servicio Cloud
                        </div>
                      </div>

                    </div>

                    <button
                      type="button"
                      onClick={() => removeRow(row.id)}
                      className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-border text-sm text-alerts hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Eliminar
                    </button>

                  </div>

                  {/* =================================================
                      CAMPOS DE ESTIMACIÓN
                  ================================================= */}

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

                    {/* Cantidad */}

                    <div>

                      <label className="block text-xs font-medium text-muted mb-2">
                        Cantidad
                      </label>

                      <input
                        type="number"
                        min="0"
                        value={row.quantity}
                        onChange={(event) =>
                          updateRow(
                            row.id,
                            'quantity',
                            Number(event.target.value),
                          )
                        }
                        className="w-full px-3 py-2.5 border border-border rounded-lg bg-white text-main outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />

                    </div>

                    {/* Horas estimadas */}

                    <div>

                      <label className="block text-xs font-medium text-muted mb-2">
                        Horas estimadas
                      </label>

                      <div className="relative">

                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />

                        <input
                          type="number"
                          min="0"
                          value={row.estimatedHours}
                          onChange={(event) =>
                            updateRow(
                              row.id,
                              'estimatedHours',
                              Number(event.target.value),
                            )
                          }
                          className="w-full pl-9 pr-3 py-2.5 border border-border rounded-lg bg-white text-main outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />

                      </div>

                    </div>

                    {/* Costo estimado */}

                    <div>

                      <label className="block text-xs font-medium text-muted mb-2">
                        Costo estimado / hora
                      </label>

                      <div className="relative">

                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm">
                          $
                        </span>

                        <input
                          type="number"
                          min="0"
                          step="0.001"
                          value={row.estimatedCost}
                          onChange={(event) =>
                            updateRow(
                              row.id,
                              'estimatedCost',
                              Number(event.target.value),
                            )
                          }
                          className="w-full pl-7 pr-3 py-2.5 border border-border rounded-lg bg-white text-main outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />

                      </div>

                    </div>

                    {/* Costo mensual */}

                    <div className="rounded-lg bg-amber-50 border border-amber-100 p-3">

                      <div className="text-xs font-medium text-muted">
                        Costo mensual
                      </div>

                      <div className="text-lg font-bold text-main mt-1">
                        ${row.monthlyCost.toFixed(2)}
                      </div>

                    </div>

                    {/* Costo anual */}

                    <div className="rounded-lg bg-slate-50 border border-border p-3">

                      <div className="text-xs font-medium text-muted">
                        Costo anual
                      </div>

                      <div className="text-lg font-bold text-main mt-1">
                        ${row.annualCost.toFixed(2)}
                      </div>

                    </div>

                  </div>

                  {/* =================================================
                      FÓRMULA
                  ================================================= */}

                  <div className="mt-4 pt-3 border-t border-border">

                    <p className="text-xs text-muted">
                      Cálculo mensual:{' '}
                      {row.quantity} × {row.estimatedHours} horas × $
                      {row.estimatedCost.toFixed(3)} / hora ={' '}
                      <span className="font-semibold text-main">
                        ${row.monthlyCost.toFixed(2)}
                      </span>
                    </p>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

        {/* =================================================
            RESUMEN TOTAL
        ================================================= */}

        <section className="card p-5 md:p-6">

          <h2 className="text-lg font-semibold text-main">
            Resumen de costos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

            <div className="rounded-xl border border-border p-5">

              <div className="text-sm text-muted">
                Costo mensual total
              </div>

              <div className="text-3xl font-bold text-main mt-2">
                ${totalMonthly.toFixed(2)}
              </div>

              <p className="text-sm text-muted mt-2">
                Estimación mensual de todos los servicios.
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
                Proyección de los costos durante 12 meses.
              </p>

            </div>

          </div>

        </section>

        {/* =================================================
            GRÁFICO DE DISTRIBUCIÓN
        ================================================= */}

        <section className="card p-5 md:p-6">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

            <div>

              <h2 className="text-lg font-semibold text-main">
                Distribución de costos
              </h2>

              <p className="text-sm text-muted mt-1">
                Costo mensual estimado por servicio.
              </p>

            </div>

            <div className="text-sm text-muted">
              Datos simulados
            </div>

          </div>

          <div
            className="mt-5"
            style={{
              width: '100%',
              height: 320,
            }}
          >

            {chartData.length > 0 ? (

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart data={chartData}>

                  <XAxis
                    dataKey="name"
                  />

                  <YAxis />

                  {/* 
                    Sin formatter personalizado para evitar
                    incompatibilidades de tipos con Recharts.
                  */}

                  <Tooltip />

                  <Bar
                    dataKey="costo"
                    name="Costo mensual"
                    fill="#2563EB"
                    radius={[4, 4, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            ) : (

              <div className="h-full flex items-center justify-center text-sm text-muted border border-dashed border-border rounded-lg">
                Agrega servicios para visualizar el gráfico.
              </div>

            )}

          </div>

        </section>

      </div>
    </div>
  )
}

export default Costs