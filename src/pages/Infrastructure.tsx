import React, { useMemo, useState } from 'react'
import {
  Activity,
  CheckCircle2,
  Globe2,
  MapPin,
  Server,
} from 'lucide-react'

import { regions } from '../data/awsServices'

/* =========================================================
   POSICIONES DE LAS REGIONES EN EL MAPA
========================================================= */

const regionMapPositions: Record<
  string,
  {
    x: number
    y: number
    labelX: number
    labelY: number
  }
> = {
  'us-east-1': {
    x: 285,
    y: 185,
    labelX: 315,
    labelY: 165,
  },

  'eu-west-1': {
    x: 700,
    y: 180,
    labelX: 730,
    labelY: 160,
  },

  'sa-east-1': {
    x: 355,
    y: 370,
    labelX: 390,
    labelY: 405,
  },

  'ap-southeast-1': {
    x: 1080,
    y: 425,
    labelX: 1115,
    labelY: 455,
  },
}

/* =========================================================
   COMPONENTE PRINCIPAL
========================================================= */

const Infrastructure = (): JSX.Element => {
  const [selectedRegionId, setSelectedRegionId] = useState(
    regions[0]?.id ?? '',
  )

  const selectedRegion = useMemo(
    () =>
      regions.find(
        (region) => region.id === selectedRegionId,
      ),
    [selectedRegionId],
  )

  /* =======================================================
     CÁLCULOS
  ======================================================= */

  const maxServices = Math.max(
    ...regions.map(
      (region) => region.plannedServices.length,
    ),
    1,
  )

  const getCoverage = (regionId: string): number => {
    const region = regions.find(
      (item) => item.id === regionId,
    )

    if (!region) return 0

    return Math.round(
      (region.plannedServices.length / maxServices) * 100,
    )
  }

  const isPrimary = (regionId: string): boolean =>
    regionId === regions[0]?.id

  const handleSelectRegion = (regionId: string): void => {
    setSelectedRegionId(regionId)
  }

  /* =======================================================
     POSICIÓN DEL MARCADOR SELECCIONADO
  ======================================================= */

  const selectedMapPosition =
    regionMapPositions[selectedRegionId]

  return (
    <div className="space-y-4">
      {/* =====================================================
          MAPA GLOBAL
      ===================================================== */}

      <section className="relative overflow-hidden rounded-2xl border border-blue-900/70 bg-[#020B1F] min-h-[540px] shadow-2xl">
        {/* =================================================
            FONDO
        ================================================= */}

        <div className="absolute inset-0 bg-gradient-to-br from-[#020817] via-[#08265C] to-[#020817]" />

        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[100px]" />

        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="absolute -bottom-40 right-[-100px] w-[550px] h-[550px] rounded-full bg-indigo-600/20 blur-[100px]" />

        {/* =================================================
            GRID
        ================================================= */}

        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgba(59,130,246,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.16) 1px, transparent 1px)',
            backgroundSize: '55px 55px',
          }}
        />

        {/* =================================================
            MAPA SVG
        ================================================= */}

        <div className="absolute inset-0">
          <svg
            viewBox="0 0 1400 650"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid slice"
            aria-label="Mapa global de infraestructura CloudOps"
          >
            <defs>
              {/* Glow */}
              <filter
                id="blueGlow"
                x="-100%"
                y="-100%"
                width="300%"
                height="300%"
              >
                <feGaussianBlur
                  stdDeviation="5"
                  result="blur"
                />

                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Glow fuerte */}
              <filter
                id="strongGlow"
                x="-200%"
                y="-200%"
                width="400%"
                height="400%"
              >
                <feGaussianBlur
                  stdDeviation="9"
                  result="blur"
                />

                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Glow seleccionado */}
              <filter
                id="selectedGlow"
                x="-300%"
                y="-300%"
                width="600%"
                height="600%"
              >
                <feGaussianBlur
                  stdDeviation="7"
                  result="blur"
                />

                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Gradiente */}
              <linearGradient
                id="landGradient"
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#164E9A"
                  stopOpacity="0.55"
                />

                <stop
                  offset="100%"
                  stopColor="#0EA5E9"
                  stopOpacity="0.10"
                />
              </linearGradient>
            </defs>

            {/* =================================================
                CONTINENTES
            ================================================= */}

            {/* Norteamérica */}
            <path
              d="
                M145 150
                L205 110
                L280 118
                L340 150
                L370 190
                L340 225
                L300 215
                L270 245
                L225 220
                L185 205
                L155 175
                Z
              "
              fill="url(#landGradient)"
              stroke="#3B82F6"
              strokeOpacity="0.45"
              strokeWidth="2"
            />

            {/* Sudamérica */}
            <path
              d="
                M345 280
                L390 305
                L410 350
                L400 405
                L370 455
                L350 520
                L315 490
                L300 430
                L315 375
                L295 330
                Z
              "
              fill="url(#landGradient)"
              stroke="#3B82F6"
              strokeOpacity="0.40"
              strokeWidth="2"
            />

            {/* Europa */}
            <path
              d="
                M640 165
                L680 145
                L725 155
                L750 180
                L730 205
                L690 210
                L660 195
                Z
              "
              fill="url(#landGradient)"
              stroke="#60A5FA"
              strokeOpacity="0.50"
              strokeWidth="2"
            />

            {/* África */}
            <path
              d="
                M665 235
                L720 225
                L755 260
                L750 325
                L720 390
                L680 425
                L650 380
                L655 320
                L635 270
                Z
              "
              fill="url(#landGradient)"
              stroke="#3B82F6"
              strokeOpacity="0.40"
              strokeWidth="2"
            />

            {/* Asia */}
            <path
              d="
                M735 165
                L805 130
                L885 145
                L960 170
                L1035 205
                L1080 250
                L1040 285
                L970 265
                L920 295
                L850 270
                L790 245
                L750 215
                Z
              "
              fill="url(#landGradient)"
              stroke="#3B82F6"
              strokeOpacity="0.45"
              strokeWidth="2"
            />

            {/* Australia */}
            <path
              d="
                M1010 390
                L1075 370
                L1140 390
                L1170 425
                L1145 470
                L1080 480
                L1030 455
                Z
              "
              fill="url(#landGradient)"
              stroke="#3B82F6"
              strokeOpacity="0.40"
              strokeWidth="2"
            />

            {/* =================================================
                CONEXIONES
            ================================================= */}

            <g
              fill="none"
              stroke="#22D3EE"
              strokeOpacity="0.65"
              strokeWidth="2"
              strokeDasharray="8 9"
            >
              {/* USA → Europa */}
              <path d="M285 185 Q500 70 700 180" />

              {/* Europa → Asia */}
              <path d="M700 180 Q850 100 1080 425" />

              {/* USA → Brasil */}
              <path d="M285 185 Q310 300 355 370" />

              {/* Europa → Singapur */}
              <path d="M700 180 Q850 320 1080 425" />
            </g>

            {/* =================================================
                MARCADORES DE REGIONES
            ================================================= */}

            {regions.map((region) => {
              const position =
                regionMapPositions[region.id]

              if (!position) return null

              const selected =
                selectedRegionId === region.id

              const primary = isPrimary(region.id)

              return (
                <g
                  key={region.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`Seleccionar ${region.code}`}
                  onClick={() =>
                    handleSelectRegion(region.id)
                  }
                  onKeyDown={(event) => {
                    if (
                      event.key === 'Enter' ||
                      event.key === ' '
                    ) {
                      event.preventDefault()
                      handleSelectRegion(region.id)
                    }
                  }}
                  style={{
                    cursor: 'pointer',
                  }}
                >
                  {/* Área grande para facilitar el clic */}
                  <circle
                    cx={position.x}
                    cy={position.y}
                    r="38"
                    fill="transparent"
                  />

                  {/* Halo cuando está seleccionado */}
                  {selected && (
                    <>
                      <circle
                        cx={position.x}
                        cy={position.y}
                        r="38"
                        fill="rgba(34,211,238,0.08)"
                        stroke="#22D3EE"
                        strokeOpacity="0.45"
                        strokeWidth="2"
                      />

                      <circle
                        cx={position.x}
                        cy={position.y}
                        r="29"
                        fill="none"
                        stroke="#38BDF8"
                        strokeOpacity="0.75"
                        strokeWidth="2"
                      />
                    </>
                  )}

                  {/* Halo normal */}
                  {!selected && (
                    <circle
                      cx={position.x}
                      cy={position.y}
                      r="25"
                      fill="none"
                      stroke={
                        primary
                          ? '#4ADE80'
                          : '#38BDF8'
                      }
                      strokeOpacity="0.35"
                      strokeWidth="2"
                    />
                  )}

                  {/* Punto */}
                  <circle
                    cx={position.x}
                    cy={position.y}
                    r={selected ? 12 : 8}
                    fill={
                      selected
                        ? '#22D3EE'
                        : primary
                        ? '#4ADE80'
                        : '#38BDF8'
                    }
                    filter={
                      selected
                        ? 'url(#selectedGlow)'
                        : 'url(#blueGlow)'
                    }
                  />

                  {/* Centro */}
                  {selected && (
                    <circle
                      cx={position.x}
                      cy={position.y}
                      r="5"
                      fill="#FFFFFF"
                    />
                  )}

                  {/* =================================================
                      ETIQUETA DEL PUNTO SELECCIONADO
                  ================================================= */}

                  {selected && (
                    <g>
                      <rect
                        x={position.labelX - 5}
                        y={position.labelY - 25}
                        width="150"
                        height="46"
                        rx="10"
                        fill="#06152F"
                        fillOpacity="0.95"
                        stroke="#22D3EE"
                        strokeOpacity="0.55"
                      />

                      <text
                        x={position.labelX + 8}
                        y={position.labelY - 7}
                        fill="white"
                        fontSize="13"
                        fontWeight="700"
                      >
                        {region.code}
                      </text>

                      <text
                        x={position.labelX + 8}
                        y={position.labelY + 10}
                        fill="#BFDBFE"
                        fontSize="10"
                      >
                        {region.location}
                      </text>
                    </g>
                  )}
                </g>
              )
            })}

            {/* =================================================
                CENTRO CLOUDOPS
            ================================================= */}

            <circle
              cx="700"
              cy="330"
              r="125"
              fill="rgba(37,99,235,0.04)"
              stroke="#3B82F6"
              strokeOpacity="0.20"
              strokeWidth="2"
            />

            <circle
              cx="700"
              cy="330"
              r="95"
              fill="rgba(37,99,235,0.06)"
              stroke="#60A5FA"
              strokeOpacity="0.35"
              strokeWidth="2"
            />

            <circle
              cx="700"
              cy="330"
              r="68"
              fill="#071A43"
              stroke="#38BDF8"
              strokeWidth="3"
              filter="url(#strongGlow)"
            />

            <circle
              cx="700"
              cy="330"
              r="53"
              fill="#2563EB"
            />

            <circle
              cx="700"
              cy="330"
              r="45"
              fill="#1D4ED8"
            />

            <text
              x="700"
              y="326"
              textAnchor="middle"
              fill="white"
              fontSize="22"
              fontWeight="700"
            >
              CloudOps
            </text>

            <text
              x="700"
              y="350"
              textAnchor="middle"
              fill="#BFDBFE"
              fontSize="12"
            >
              Infraestructura Global
            </text>
          </svg>
        </div>

        {/* =================================================
            CABECERA DEL MAPA
        ================================================= */}

        <div className="relative z-20 p-4 md:p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-900/50">
                <Globe2 className="w-6 h-6 text-white" />
              </div>

              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  Distribución global
                </h1>

                <p className="text-sm text-blue-100/70 mt-1">
                  Regiones y servicios considerados para la
                  solución CloudOps.
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-5 text-xs text-blue-100/80">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.9)]" />
                Activa
              </span>

              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.9)]" />
                Planificada
              </span>
            </div>
          </div>
        </div>

        {/* =================================================
            TARJETA DE LA REGIÓN SELECCIONADA
        ================================================= */}

        {selectedRegion && (
          <div className="absolute z-30 left-6 bottom-7 w-[270px] max-w-[calc(100%-3rem)]">
            <div className="rounded-2xl border border-blue-400/30 bg-[#06152F]/95 backdrop-blur-xl p-4 shadow-2xl">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-300" />
                  </div>

                  <div>
                    <div className="font-bold text-white">
                      {selectedRegion.code}
                    </div>

                    <div className="text-xs text-blue-100/60 mt-1">
                      {selectedRegion.location}
                    </div>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-semibold ${
                    isPrimary(selectedRegion.id)
                      ? 'bg-green-500/15 text-green-300 border border-green-400/20'
                      : 'bg-blue-500/15 text-blue-300 border border-blue-400/20'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isPrimary(selectedRegion.id)
                        ? 'bg-green-400'
                        : 'bg-blue-400'
                    }`}
                  />

                  {isPrimary(selectedRegion.id)
                    ? 'Activa'
                    : 'Planificada'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                  <div className="text-[11px] text-blue-100/50">
                    Servicios
                  </div>

                  <div className="text-xl font-bold text-white mt-1">
                    {selectedRegion.plannedServices.length}
                  </div>
                </div>

                <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                  <div className="text-[11px] text-blue-100/50">
                    Estado
                  </div>

                  <div className="text-sm font-bold text-green-300 mt-1">
                    {isPrimary(selectedRegion.id)
                      ? 'Activa'
                      : 'Planificada'}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-[10px] text-blue-100/50 mb-1.5">
                  <span>Cobertura de servicios</span>
                  <span>
                    {getCoverage(selectedRegion.id)}%
                  </span>
                </div>

                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isPrimary(selectedRegion.id)
                        ? 'bg-green-400'
                        : 'bg-cyan-400'
                    }`}
                    style={{
                      width: `${getCoverage(
                        selectedRegion.id,
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =================================================
            INDICADOR DE REGIÓN
        ================================================= */}

        {selectedRegion && (
          <div className="absolute z-30 bottom-5 left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-3 px-5 py-3 rounded-full bg-[#06152F]/90 border border-blue-400/30 backdrop-blur-xl shadow-xl">
            <Activity className="w-4 h-4 text-cyan-400" />

            <span className="text-xs text-blue-100/60">
              Región seleccionada
            </span>

            <span className="text-sm font-bold text-white">
              {selectedRegion.code}
            </span>

            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isPrimary(selectedRegion.id)
                  ? 'bg-green-400'
                  : 'bg-blue-400'
              }`}
            />

            <span className="text-xs text-green-300">
              {selectedRegion.plannedServices.length}{' '}
              servicios
            </span>
          </div>
        )}
      </section>

      {/* =====================================================
          REGIONES DISPONIBLES
      ===================================================== */}

      <section className="card p-4 md:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold text-main">
              Regiones disponibles
            </h2>

            <p className="text-sm text-muted mt-1">
              Selecciona una región para consultar su
              infraestructura y servicios.
            </p>
          </div>

          <div className="text-xs text-muted">
            {regions.length} regiones mostradas
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 mt-4">
          {regions.map((region) => {
            const isSelected =
              selectedRegionId === region.id

            const coverage = getCoverage(region.id)

            const primary = isPrimary(region.id)

            return (
              <button
                key={region.id}
                type="button"
                onClick={() =>
                  handleSelectRegion(region.id)
                }
                className={`text-left rounded-xl border p-4 transition-all duration-200 ${
                  isSelected
                    ? 'border-primary bg-primary/[0.03] shadow-md shadow-blue-100'
                    : 'border-border bg-white hover:border-primary/40 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        isSelected
                          ? 'bg-primary text-white'
                          : 'bg-primary/10 text-primary'
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                    </div>

                    <div>
                      <div className="font-semibold text-main">
                        {region.code}
                      </div>

                      <div className="text-xs text-muted mt-0.5">
                        {region.location}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <CheckCircle2 className="w-4 h-4 text-security shrink-0" />
                  )}
                </div>

                {/* Cobertura */}
                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs text-muted mb-2">
                    <span>Cobertura</span>
                    <span>{coverage}%</span>
                  </div>

                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        primary
                          ? 'bg-green-500'
                          : 'bg-primary'
                      }`}
                      style={{
                        width: `${coverage}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Servicios */}
                <div className="mt-4 pt-3 border-t border-border">
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <Server className="w-3.5 h-3.5" />

                    <span>
                      {region.plannedServices.length}{' '}
                      {region.plannedServices.length === 1
                        ? 'servicio'
                        : 'servicios'}
                    </span>
                  </div>
                </div>

                {/* Estado */}
                <div className="mt-3 flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-medium ${
                      primary
                        ? 'bg-green-50 text-green-700'
                        : 'bg-blue-50 text-blue-700'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        primary
                          ? 'bg-green-500'
                          : 'bg-blue-500'
                      }`}
                    />

                    {primary
                      ? 'Región principal'
                      : 'Planificada'}
                  </span>

                  <span
                    className={`text-xs font-semibold ${
                      isSelected
                        ? 'text-primary'
                        : 'text-muted'
                    }`}
                  >
                    {isSelected
                      ? 'Seleccionada'
                      : 'Ver mapa'}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* =====================================================
          DETALLE DE LA REGIÓN SELECCIONADA
      ===================================================== */}

      {selectedRegion && (
        <section className="card p-4 md:p-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />

                <h2 className="text-lg font-semibold text-main">
                  Detalle de infraestructura
                </h2>

                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    isPrimary(selectedRegion.id)
                      ? 'bg-green-50 text-green-700'
                      : 'bg-blue-50 text-blue-700'
                  }`}
                >
                  {isPrimary(selectedRegion.id)
                    ? 'Activa'
                    : 'Planificada'}
                </span>
              </div>

              <p className="text-sm text-muted mt-1">
                Información de la región seleccionada en
                el mapa.
              </p>
            </div>

            <div className="text-sm font-medium text-primary">
              {selectedRegion.code}
            </div>
          </div>

          {/* =================================================
              DATOS PRINCIPALES
          ================================================= */}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-4">
            {/* Región */}
            <div className="rounded-xl border border-border bg-background p-4">
              <div className="flex items-center gap-2 text-sm text-muted">
                <MapPin className="w-4 h-4 text-primary" />
                Región
              </div>

              <div className="text-xl font-bold text-main mt-2">
                {selectedRegion.code}
              </div>
            </div>

            {/* Ubicación */}
            <div className="rounded-xl border border-border bg-background p-4">
              <div className="flex items-center gap-2 text-sm text-muted">
                <Globe2 className="w-4 h-4 text-primary" />
                Ubicación
              </div>

              <div className="text-base font-bold text-main mt-2">
                {selectedRegion.location}
              </div>
            </div>

            {/* Servicios */}
            <div className="rounded-xl border border-border bg-background p-4">
              <div className="flex items-center gap-2 text-sm text-muted">
                <Server className="w-4 h-4 text-primary" />
                Servicios desplegados
              </div>

              <div className="text-xl font-bold text-main mt-2">
                {selectedRegion.plannedServices.length}
              </div>
            </div>

            {/* Estado */}
            <div className="rounded-xl border border-border bg-background p-4">
              <div className="flex items-center gap-2 text-sm text-muted">
                <CheckCircle2 className="w-4 h-4 text-security" />
                Estado
              </div>

              <div className="text-lg font-bold text-security mt-2">
                {isPrimary(selectedRegion.id)
                  ? 'Activa'
                  : 'Planificada'}
              </div>
            </div>
          </div>

          {/* =================================================
              SERVICIOS DESPLEGADOS
          ================================================= */}

          <div className="mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="font-semibold text-main">
                  Servicios desplegados
                </h3>

                <p className="text-xs text-muted mt-1">
                  Recursos considerados dentro de la región
                  seleccionada.
                </p>
              </div>

              <span className="text-xs font-semibold text-primary">
                {selectedRegion.plannedServices.length}{' '}
                servicios
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mt-3">
              {selectedRegion.plannedServices.map(
                (service) => (
                  <div
                    key={service}
                    className="rounded-xl border border-border bg-white p-4 hover:border-primary/40 hover:shadow-sm transition-all"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Server className="w-4 h-4 text-primary" />
                    </div>

                    <div className="font-semibold text-main mt-3">
                      {service}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-security mt-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-security" />
                      Disponible
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          RESUMEN GENERAL
      ===================================================== */}

      <section className="card p-4 md:p-5">
        <div>
          <h2 className="text-lg font-semibold text-main">
            Resumen de infraestructura
          </h2>

          <p className="text-sm text-muted mt-1">
            Vista general de las regiones, ubicaciones,
            servicios desplegados y estado.
          </p>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-3 px-3 font-semibold text-main">
                  Región
                </th>

                <th className="py-3 px-3 font-semibold text-main">
                  Ubicación
                </th>

                <th className="py-3 px-3 font-semibold text-main">
                  Servicios desplegados
                </th>

                <th className="py-3 px-3 font-semibold text-main">
                  Estado
                </th>
              </tr>
            </thead>

            <tbody>
              {regions.map((region) => {
                const primary = isPrimary(region.id)

                const selected =
                  selectedRegionId === region.id

                return (
                  <tr
                    key={region.id}
                    className={`border-b border-border last:border-b-0 transition-colors ${
                      selected
                        ? 'bg-primary/[0.03]'
                        : 'hover:bg-background'
                    }`}
                  >
                    {/* Región */}
                    <td className="py-4 px-3">
                      <button
                        type="button"
                        onClick={() =>
                          handleSelectRegion(region.id)
                        }
                        className="font-semibold text-primary hover:underline"
                      >
                        {region.code}
                      </button>
                    </td>

                    {/* Ubicación */}
                    <td className="py-4 px-3 text-muted">
                      {region.location}
                    </td>

                    {/* Servicios */}
                    <td className="py-4 px-3">
                      <div className="flex flex-wrap gap-1.5">
                        {region.plannedServices.map(
                          (service) => (
                            <button
                              key={service}
                              type="button"
                              onClick={() =>
                                handleSelectRegion(
                                  region.id,
                                )
                              }
                              className="px-2 py-1 rounded-md bg-slate-100 text-xs text-main hover:bg-primary/10 hover:text-primary transition-colors"
                            >
                              {service}
                            </button>
                          ),
                        )}
                      </div>
                    </td>

                    {/* Estado */}
                    <td className="py-4 px-3">
                      <button
                        type="button"
                        onClick={() =>
                          handleSelectRegion(region.id)
                        }
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          primary
                            ? 'bg-green-50 text-green-700'
                            : 'bg-blue-50 text-blue-700'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            primary
                              ? 'bg-green-500'
                              : 'bg-blue-500'
                          }`}
                        />

                        {primary
                          ? 'Activa'
                          : 'Planificada'}
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default Infrastructure