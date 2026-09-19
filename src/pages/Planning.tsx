import React, {
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  Check,
  Cloud,
  Save,
  Users,
  Layers,
  Target,
  MapPin,
  Trash2,
  Pencil,
  RotateCcw,
  Zap,
  DollarSign,
  Server,
  ShieldCheck,
  Globe,
  Database,
  HardDrive,
  Network,
  CheckCircle2,
  Circle,
  Sparkles,
  TrendingUp,
  Activity,
  Copy,
  Download,
  Search,
  X,
  BarChart3,
  Eye,
  ChevronRight,
} from 'lucide-react'

import {
  awsServices,
  regions,
  costEstimates,
} from '../data/awsServices'

interface CloudProposal {
  id: string
  solutionName: string
  applicationType: string
  description: string
  region: string
  users: number
  availability: string
  services: string[]
  migrationObjectives: string[]
  monthlyCost: number
  annualCost: number
  createdAt: string
}

const migrationOptions = [
  'Reducir costos operativos',
  'Mejorar el rendimiento',
  'Aumentar la disponibilidad',
  'Mejorar la escalabilidad',
  'Mejorar la seguridad',
  'Modernizar la infraestructura',
  'Facilitar el acceso a los usuarios',
  'Migrar servicios a la nube',
]

const applicationOptions = [
  'Aplicación web',
  'Aplicación móvil',
  'API / Backend',
  'E-commerce',
  'Sistema empresarial',
  'Aplicación de datos',
]

const availabilityOptions = [
  {
    value: '99.0% - Baja',
    label: 'Baja',
    description: 'Aplicaciones no críticas',
    icon: '○',
  },
  {
    value: '99.5% - Media',
    label: 'Media',
    description: 'Aplicaciones importantes',
    icon: '◐',
  },
  {
    value: '99.9% - Alta',
    label: 'Alta',
    description: 'Aplicaciones críticas',
    icon: '●',
  },
  {
    value: '99.99% - Muy alta',
    label: 'Muy alta',
    description: 'Alta disponibilidad Multi-AZ',
    icon: '◆',
  },
]

const quickConfigurations = [
  {
    id: 'web',
    title: 'Arquitectura Web',
    description: 'Frontend, backend y base de datos',
    icon: Globe,
    applicationType: 'Aplicación web',
    services: [
      'route53',
      'cloudfront',
      'vpc',
      'ec2',
      'rds',
      's3',
      'iam',
    ],
    objectives: [
      'Mejorar el rendimiento',
      'Mejorar la escalabilidad',
      'Aumentar la disponibilidad',
    ],
    availability: '99.9% - Alta',
  },
  {
    id: 'api',
    title: 'API / Backend',
    description: 'API segura y escalable',
    icon: Network,
    applicationType: 'API / Backend',
    services: [
      'route53',
      'vpc',
      'ec2',
      'rds',
      'iam',
    ],
    objectives: [
      'Mejorar la seguridad',
      'Mejorar la escalabilidad',
      'Mejorar el rendimiento',
    ],
    availability: '99.9% - Alta',
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce',
    description: 'Tienda online de alta disponibilidad',
    icon: Sparkles,
    applicationType: 'E-commerce',
    services: [
      'route53',
      'cloudfront',
      'vpc',
      'ec2',
      'rds',
      's3',
      'iam',
    ],
    objectives: [
      'Aumentar la disponibilidad',
      'Mejorar el rendimiento',
      'Mejorar la escalabilidad',
      'Mejorar la seguridad',
    ],
    availability: '99.99% - Muy alta',
  },
]

const serviceIcons: Record<string, React.ElementType> = {
  ec2: Server,
  s3: HardDrive,
  rds: Database,
  iam: ShieldCheck,
  vpc: Network,
  route53: Globe,
  cloudfront: Cloud,
}

const Planning = (): JSX.Element => {
  const [solutionName, setSolutionName] = useState('')
  const [applicationType, setApplicationType] = useState('')
  const [description, setDescription] = useState('')

  const [selectedRegion, setSelectedRegion] = useState(
    regions[0]?.code ?? '',
  )

  const [users, setUsers] = useState('')
  const [availability, setAvailability] = useState('')

  const [selectedServices, setSelectedServices] =
    useState<string[]>([])

  const [migrationObjectives, setMigrationObjectives] =
    useState<string[]>([])

  const [proposals, setProposals] = useState<
    CloudProposal[]
  >([])

  const [editingId, setEditingId] = useState<string | null>(
    null,
  )

  const [searchTerm, setSearchTerm] = useState('')

  const [successMessage, setSuccessMessage] = useState('')

  const [showPreview, setShowPreview] = useState(false)

  /*
   * Cargar propuestas almacenadas
   */
  useEffect(() => {
    const saved = localStorage.getItem(
      'cloudops-proposals',
    )

    if (!saved) return

    try {
      const parsed: CloudProposal[] = JSON.parse(saved)

      if (Array.isArray(parsed)) {
        setProposals(parsed)
      }
    } catch {
      setProposals([])
    }
  }, [])

  /*
   * Guardar automáticamente
   */
  useEffect(() => {
    localStorage.setItem(
      'cloudops-proposals',
      JSON.stringify(proposals),
    )
  }, [proposals])

  /*
   * Mostrar mensaje temporal
   */
  const showMessage = (message: string): void => {
    setSuccessMessage(message)

    window.setTimeout(() => {
      setSuccessMessage('')
    }, 3500)
  }

  /*
   * Seleccionar / quitar servicio
   */
  const toggleService = (
    serviceId: string,
  ): void => {
    setSelectedServices((currentServices) => {
      if (currentServices.includes(serviceId)) {
        return currentServices.filter(
          (id) => id !== serviceId,
        )
      }

      return [...currentServices, serviceId]
    })
  }

  /*
   * Seleccionar / quitar objetivo
   */
  const toggleMigrationObjective = (
    objective: string,
  ): void => {
    setMigrationObjectives((currentObjectives) => {
      if (currentObjectives.includes(objective)) {
        return currentObjectives.filter(
          (item) => item !== objective,
        )
      }

      return [...currentObjectives, objective]
    })
  }

  /*
   * Configuración rápida
   */
  const applyQuickConfiguration = (
    configuration: (typeof quickConfigurations)[number],
  ): void => {
    setApplicationType(configuration.applicationType)
    setSelectedServices(configuration.services)
    setMigrationObjectives(
      configuration.objectives,
    )
    setAvailability(configuration.availability)

    showMessage(
      `${configuration.title} aplicada correctamente.`,
    )
  }

  /*
   * Servicios actuales
   */
  const selectedServiceData = useMemo(() => {
    return awsServices.filter((service) =>
      selectedServices.includes(service.id),
    )
  }, [selectedServices])

  /*
   * Costos
   */
  const serviceCosts = useMemo(() => {
    return selectedServiceData.map((service) => {
      const cost = costEstimates.find(
        (item) => item.serviceName === service.name,
      )

      return {
        id: service.id,
        name: service.name,
        monthlyCost: cost?.monthlyCost ?? 0,
        annualCost: (cost?.monthlyCost ?? 0) * 12,
      }
    })
  }, [selectedServiceData])

  const estimatedMonthlyCost = useMemo(() => {
    return serviceCosts.reduce(
      (total, item) => total + item.monthlyCost,
      0,
    )
  }, [serviceCosts])

  const estimatedAnnualCost =
    estimatedMonthlyCost * 12

  /*
   * Progreso de los 8 campos
   */
  const completedFields = [
    solutionName.trim() !== '',
    applicationType !== '',
    description.trim() !== '',
    selectedRegion !== '',
    users !== '' && Number(users) > 0,
    availability !== '',
    selectedServices.length > 0,
    migrationObjectives.length > 0,
  ].filter(Boolean).length

  const progress = Math.round(
    (completedFields / 8) * 100,
  )

  /*
   * Región
   */
  const currentRegion = regions.find(
    (region) => region.code === selectedRegion,
  )

  /*
   * Formulario
   */
  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ): void => {
    event.preventDefault()

    if (!solutionName.trim()) {
      showMessage(
        'Ingresa el nombre de la solución.',
      )
      return
    }

    if (!applicationType) {
      showMessage(
        'Selecciona el tipo de aplicación.',
      )
      return
    }

    if (!description.trim()) {
      showMessage(
        'Ingresa una descripción.',
      )
      return
    }

    if (!users || Number(users) <= 0) {
      showMessage(
        'Ingresa un número válido de usuarios.',
      )
      return
    }

    if (selectedServices.length === 0) {
      showMessage(
        'Selecciona al menos un servicio Cloud.',
      )
      return
    }

    if (migrationObjectives.length === 0) {
      showMessage(
        'Selecciona al menos un objetivo de migración.',
      )
      return
    }

    const currentDate =
      new Date().toLocaleDateString('es-PE')

    const proposal: CloudProposal = {
      id:
        editingId ??
        `PROP-${String(
          proposals.length + 1,
        ).padStart(3, '0')}`,
      solutionName: solutionName.trim(),
      applicationType,
      description: description.trim(),
      region: selectedRegion,
      users: Number(users),
      availability,
      services: selectedServices,
      migrationObjectives,
      monthlyCost: estimatedMonthlyCost,
      annualCost: estimatedAnnualCost,
      createdAt: currentDate,
    }

    if (editingId) {
      setProposals((currentProposals) =>
        currentProposals.map((item) =>
          item.id === editingId
            ? proposal
            : item,
        ),
      )

      showMessage(
        'La propuesta fue actualizada correctamente.',
      )
    } else {
      setProposals((currentProposals) => [
        proposal,
        ...currentProposals,
      ])

      showMessage(
        'La propuesta Cloud fue registrada correctamente.',
      )
    }

    resetForm(false)
  }

  /*
   * Limpiar formulario
   */
  const resetForm = (
    displayMessage = true,
  ): void => {
    setSolutionName('')
    setApplicationType('')
    setDescription('')
    setSelectedRegion(
      regions[0]?.code ?? '',
    )
    setUsers('')
    setAvailability('')
    setSelectedServices([])
    setMigrationObjectives([])
    setEditingId(null)

    if (displayMessage) {
      showMessage(
        'Formulario limpiado correctamente.',
      )
    }
  }

  /*
   * Editar
   */
  const editProposal = (
    proposal: CloudProposal,
  ): void => {
    setSolutionName(proposal.solutionName)
    setApplicationType(
      proposal.applicationType,
    )
    setDescription(proposal.description)
    setSelectedRegion(proposal.region)
    setUsers(String(proposal.users))
    setAvailability(proposal.availability)
    setSelectedServices(proposal.services)
    setMigrationObjectives(
      proposal.migrationObjectives,
    )
    setEditingId(proposal.id)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })

    showMessage(
      `Editando ${proposal.id}. Guarda nuevamente los cambios.`,
    )
  }

  /*
   * Duplicar
   */
  const duplicateProposal = (
    proposal: CloudProposal,
  ): void => {
    const duplicated: CloudProposal = {
      ...proposal,
      id: `PROP-${String(
        proposals.length + 1,
      ).padStart(3, '0')}`,
      solutionName: `${proposal.solutionName} - Copia`,
      createdAt:
        new Date().toLocaleDateString('es-PE'),
    }

    setProposals((currentProposals) => [
      duplicated,
      ...currentProposals,
    ])

    showMessage(
      'La propuesta fue duplicada correctamente.',
    )
  }

  /*
   * Eliminar
   */
  const deleteProposal = (
    proposalId: string,
  ): void => {
    const confirmed = window.confirm(
      '¿Deseas eliminar esta propuesta?',
    )

    if (!confirmed) return

    setProposals((currentProposals) =>
      currentProposals.filter(
        (proposal) =>
          proposal.id !== proposalId,
      ),
    )

    showMessage(
      'Propuesta eliminada correctamente.',
    )
  }

  /*
   * Exportar propuesta
   */
  const exportProposal = (
    proposal: CloudProposal,
  ): void => {
    const content = JSON.stringify(
      proposal,
      null,
      2,
    )

    const blob = new Blob(
      [content],
      {
        type: 'application/json',
      },
    )

    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')

    link.href = url

    link.download = `${proposal.id}-${proposal.solutionName
      .replace(/\s+/g, '-')
      .toLowerCase()}.json`

    document.body.appendChild(link)

    link.click()

    document.body.removeChild(link)

    URL.revokeObjectURL(url)

    showMessage(
      'Propuesta exportada correctamente.',
    )
  }

  /*
   * Obtener nombre
   */
  const getServiceName = (
    serviceId: string,
  ): string => {
    const service = awsServices.find(
      (item) => item.id === serviceId,
    )

    return service?.name ?? serviceId
  }

  /*
   * Obtener región
   */
  const getRegionLocation = (
    regionCode: string,
  ): string => {
    const region = regions.find(
      (item) => item.code === regionCode,
    )

    return region?.location ?? ''
  }

  /*
   * Filtrar propuestas
   */
  const filteredProposals = useMemo(() => {
    const normalizedSearch =
      searchTerm.toLowerCase().trim()

    if (!normalizedSearch) {
      return proposals
    }

    return proposals.filter((proposal) => {
      const content = [
        proposal.id,
        proposal.solutionName,
        proposal.applicationType,
        proposal.region,
        proposal.description,
        ...proposal.services,
        ...proposal.migrationObjectives,
      ]
        .join(' ')
        .toLowerCase()

      return content.includes(
        normalizedSearch,
      )
    })
  }, [proposals, searchTerm])

  const latestProposal =
    proposals[0] ?? null

  return (
    <div className="space-y-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* =========================================
            ENCABEZADO
        ========================================= */}

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Cloud className="w-5 h-5 text-primary" />
              </div>

              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Cloud Solution Planner
              </span>
            </div>

            <h1 className="text-main-title">
              Planificación Cloud
            </h1>

            <p className="text-muted mt-1">
              Diseña, configura y registra una propuesta
              de solución en la nube.
            </p>
          </div>

          {/* PROGRESO */}
          <div className="card px-4 py-3 min-w-[280px]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />

                <span className="text-xs font-medium text-muted">
                  Progreso de configuración
                </span>
              </div>

              <span className="text-sm font-bold text-primary">
                {progress}%
              </span>
            </div>

            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <p className="text-[11px] text-muted mt-2">
              {completedFields} de 8 campos completados
            </p>
          </div>
        </div>

        {/* =========================================
            MENSAJE
        ========================================= */}

        {successMessage && (
          <div className="flex items-center justify-between gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700 shadow-sm">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 shrink-0" />

              <span>{successMessage}</span>
            </div>

            <button
              type="button"
              onClick={() =>
                setSuccessMessage('')
              }
              className="text-blue-500 hover:text-blue-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* =========================================
            CONFIGURACIONES RÁPIDAS
        ========================================= */}

        <div className="card p-5">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-5 h-5 text-costs" />

            <h2 className="font-semibold text-main">
              Configuraciones rápidas
            </h2>
          </div>

          <p className="text-xs text-muted mb-4">
            Utiliza una arquitectura base para
            configurar rápidamente tu propuesta.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {quickConfigurations.map(
              (configuration) => {
                const Icon =
                  configuration.icon

                return (
                  <button
                    key={configuration.id}
                    type="button"
                    onClick={() =>
                      applyQuickConfiguration(
                        configuration,
                      )
                    }
                    className="group text-left p-4 rounded-xl border border-border bg-white hover:border-primary hover:bg-blue-50/40 transition-all hover:-translate-y-0.5"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                        <Icon className="w-5 h-5 text-primary group-hover:text-white" />
                      </div>

                      <ChevronRight className="w-4 h-4 text-muted group-hover:text-primary transition-transform group-hover:translate-x-1" />
                    </div>

                    <h3 className="font-semibold text-main mt-3">
                      {configuration.title}
                    </h3>

                    <p className="text-xs text-muted mt-1">
                      {configuration.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="px-2 py-1 rounded bg-slate-100 text-muted text-[10px]">
                        {configuration.services.length}{' '}
                        servicios
                      </span>

                      <span className="px-2 py-1 rounded bg-blue-50 text-primary text-[10px]">
                        {configuration.objectives.length}{' '}
                        objetivos
                      </span>

                      <span className="px-2 py-1 rounded bg-green-50 text-green-700 text-[10px]">
                        {configuration.availability.split(
                          ' - ',
                        )[0]}
                      </span>
                    </div>
                  </button>
                )
              },
            )}
          </div>
        </div>

        {/* =========================================
            FORMULARIO + PANEL
        ========================================= */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* FORMULARIO */}

          <div className="xl:col-span-2 card p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-main">
                    {editingId
                      ? 'Editar propuesta Cloud'
                      : 'Nueva propuesta Cloud'}
                  </h2>

                  <p className="text-sm text-muted">
                    Completa los 8 campos de la solución.
                  </p>
                </div>
              </div>

              {editingId && (
                <span className="text-xs font-semibold text-primary bg-blue-50 px-3 py-1.5 rounded-full">
                  Editando {editingId}
                </span>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* 1 + 2 */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="solutionName"
                    className="block text-sm font-medium text-main mb-2"
                  >
                    1. Nombre de la solución *
                  </label>

                  <input
                    id="solutionName"
                    type="text"
                    value={solutionName}
                    onChange={(event) =>
                      setSolutionName(
                        event.target.value,
                      )
                    }
                    placeholder="Ej. Portal E-Commerce Cloud"
                    required
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-main outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="applicationType"
                    className="block text-sm font-medium text-main mb-2"
                  >
                    2. Tipo de aplicación *
                  </label>

                  <select
                    id="applicationType"
                    value={applicationType}
                    onChange={(event) =>
                      setApplicationType(
                        event.target.value,
                      )
                    }
                    required
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-main outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                  >
                    <option value="">
                      Seleccionar tipo
                    </option>

                    {applicationOptions.map(
                      (option) => (
                        <option
                          key={option}
                          value={option}
                        >
                          {option}
                        </option>
                      ),
                    )}
                  </select>
                </div>
              </div>

              {/* 3 */}

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-main mb-2"
                >
                  3. Descripción *
                </label>

                <textarea
                  id="description"
                  value={description}
                  onChange={(event) =>
                    setDescription(
                      event.target.value,
                    )
                  }
                  placeholder="Describe el alcance técnico y operativo de la propuesta..."
                  rows={4}
                  required
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-main outline-none resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                />

                <div className="flex justify-between text-[11px] text-muted mt-1">
                  <span>
                    Describe brevemente la solución.
                  </span>

                  <span>
                    {description.length} caracteres
                  </span>
                </div>
              </div>

              {/* 4 + 5 */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium text-main mb-2"
                  >
                    4. Región seleccionada *
                  </label>

                  <select
                    id="region"
                    value={selectedRegion}
                    onChange={(event) =>
                      setSelectedRegion(
                        event.target.value,
                      )
                    }
                    required
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-main outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                  >
                    {regions.map((region) => (
                      <option
                        key={region.id}
                        value={region.code}
                      >
                        {region.code} —{' '}
                        {region.location}
                      </option>
                    ))}
                  </select>

                  {currentRegion && (
                    <div className="flex items-center gap-2 mt-2 text-[11px] text-muted">
                      <MapPin className="w-3.5 h-3.5 text-primary" />

                      <span>
                        {currentRegion.location}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="users"
                    className="block text-sm font-medium text-main mb-2"
                  >
                    5. Número estimado de usuarios *
                  </label>

                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />

                    <input
                      id="users"
                      type="number"
                      min="1"
                      value={users}
                      onChange={(event) =>
                        setUsers(
                          event.target.value,
                        )
                      }
                      placeholder="Ej. 10000"
                      required
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-border bg-white text-main outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                    />
                  </div>

                  {Number(users) > 0 && (
                    <p className="text-[11px] text-muted mt-2">
                      Capacidad estimada:{' '}
                      <span className="font-semibold text-main">
                        {Number(
                          users,
                        ).toLocaleString()}{' '}
                        usuarios
                      </span>
                    </p>
                  )}
                </div>
              </div>

              {/* 6 */}

              <div>
                <label className="block text-sm font-medium text-main mb-3">
                  6. Nivel de disponibilidad requerido *
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {availabilityOptions.map(
                    (option) => {
                      const isSelected =
                        availability ===
                        option.value

                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() =>
                            setAvailability(
                              option.value,
                            )
                          }
                          className={[
                            'text-left p-3 rounded-xl border transition-all',
                            isSelected
                              ? 'border-primary bg-primary/5 ring-1 ring-primary'
                              : 'border-border bg-white hover:border-primary/50 hover:bg-slate-50',
                          ].join(' ')}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={[
                                'w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold',
                                isSelected
                                  ? 'bg-primary text-white'
                                  : 'bg-slate-100 text-muted',
                              ].join(' ')}
                            >
                              {option.icon}
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-sm text-main">
                                  {option.label}
                                </span>

                                {isSelected && (
                                  <CheckCircle2 className="w-4 h-4 text-primary" />
                                )}
                              </div>

                              <p className="text-[11px] text-muted mt-0.5">
                                {option.description}
                              </p>
                            </div>
                          </div>
                        </button>
                      )
                    },
                  )}
                </div>
              </div>

              {/* 7 */}

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-main">
                    7. Servicios Cloud seleccionados *
                  </label>

                  <span className="text-xs font-semibold text-primary">
                    {selectedServices.length}{' '}
                    seleccionados
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {awsServices.map((service) => {
                    const isSelected =
                      selectedServices.includes(
                        service.id,
                      )

                    const Icon =
                      serviceIcons[
                        service.id
                      ] ?? Cloud

                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() =>
                          toggleService(
                            service.id,
                          )
                        }
                        className={[
                          'group text-left p-3 rounded-xl border transition-all',
                          isSelected
                            ? 'border-primary bg-primary/5 ring-1 ring-primary'
                            : 'border-border bg-white hover:border-primary/50 hover:bg-slate-50',
                        ].join(' ')}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div
                            className={[
                              'w-9 h-9 rounded-lg flex items-center justify-center transition-colors',
                              isSelected
                                ? 'bg-primary text-white'
                                : 'bg-slate-100 text-muted group-hover:bg-blue-50 group-hover:text-primary',
                            ].join(' ')}
                          >
                            <Icon className="w-4 h-4" />
                          </div>

                          <div
                            className={[
                              'w-5 h-5 rounded-md border flex items-center justify-center shrink-0',
                              isSelected
                                ? 'bg-primary border-primary'
                                : 'border-border',
                            ].join(' ')}
                          >
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-white" />
                            )}
                          </div>
                        </div>

                        <div className="mt-3">
                          <div className="font-semibold text-sm text-main">
                            {service.name}
                          </div>

                          <div className="text-[11px] text-primary mt-0.5">
                            {service.category}
                          </div>

                          <p className="text-[10px] text-muted mt-2 line-clamp-2 leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* 8 */}

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-main">
                    8. Objetivo de la migración *
                  </label>

                  <span className="text-xs font-semibold text-primary">
                    {migrationObjectives.length}{' '}
                    seleccionados
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {migrationOptions.map(
                    (objective) => {
                      const isSelected =
                        migrationObjectives.includes(
                          objective,
                        )

                      return (
                        <button
                          key={objective}
                          type="button"
                          onClick={() =>
                            toggleMigrationObjective(
                              objective,
                            )
                          }
                          className={[
                            'text-left p-3 rounded-lg border transition-all',
                            isSelected
                              ? 'border-primary bg-primary/5 ring-1 ring-primary'
                              : 'border-border bg-white hover:border-primary/50 hover:bg-slate-50',
                          ].join(' ')}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={[
                                'w-5 h-5 rounded-md border flex items-center justify-center shrink-0',
                                isSelected
                                  ? 'bg-primary border-primary'
                                  : 'border-border',
                              ].join(' ')}
                            >
                              {isSelected ? (
                                <Check className="w-3 h-3 text-white" />
                              ) : (
                                <Circle className="w-3 h-3 text-transparent" />
                              )}
                            </div>

                            <span className="text-sm text-main">
                              {objective}
                            </span>
                          </div>
                        </button>
                      )
                    },
                  )}
                </div>
              </div>

              {/* BOTONES */}

              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => resetForm()}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-white text-main font-medium hover:bg-slate-50 transition-colors text-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  Limpiar
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-blue-700 transition-colors text-sm shadow-sm"
                >
                  <Save className="w-4 h-4" />

                  {editingId
                    ? 'Actualizar propuesta'
                    : 'Registrar propuesta'}
                </button>
              </div>
            </form>
          </div>

          {/* =========================================
              PANEL DERECHO
          ========================================= */}

          <div className="space-y-4">
            {/* RESUMEN */}

            <div className="card p-5">
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-5 h-5 text-primary" />

                <h2 className="font-semibold text-main">
                  Resumen en tiempo real
                </h2>
              </div>

              <p className="text-xs text-muted">
                Vista previa de la propuesta actual.
              </p>

              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="p-3 rounded-lg bg-slate-50">
                  <div className="text-[11px] text-muted">
                    Servicios
                  </div>

                  <div className="text-xl font-bold text-main mt-1">
                    {selectedServices.length}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50">
                  <div className="text-[11px] text-muted">
                    Objetivos
                  </div>

                  <div className="text-xl font-bold text-main mt-1">
                    {migrationObjectives.length}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50">
                  <div className="text-[11px] text-muted">
                    Usuarios
                  </div>

                  <div className="text-xl font-bold text-main mt-1">
                    {users
                      ? Number(
                          users,
                        ).toLocaleString()
                      : '0'}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50">
                  <div className="text-[11px] text-muted">
                    Disponibilidad
                  </div>

                  <div className="text-sm font-bold text-main mt-2">
                    {availability
                      ? availability.split(
                          ' - ',
                        )[0]
                      : 'N/D'}
                  </div>
                </div>
              </div>
            </div>

            {/* COSTOS */}

            <div className="card p-5">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-costs" />
                </div>

                <div>
                  <h3 className="font-semibold text-main text-sm">
                    Costo estimado
                  </h3>

                  <p className="text-[11px] text-muted">
                    Según servicios seleccionados
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[11px] text-muted">
                      Mensual
                    </p>

                    <p className="text-2xl font-bold text-main">
                      $
                      {estimatedMonthlyCost.toFixed(
                        2,
                      )}
                    </p>
                  </div>

                  <TrendingUp className="w-5 h-5 text-costs" />
                </div>

                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted">
                      Proyección anual
                    </span>

                    <span className="font-bold text-main">
                      $
                      {estimatedAnnualCost.toFixed(
                        2,
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-muted mt-3">
                * Valores simulados para fines
                académicos.
              </p>
            </div>

            {/* DESGLOSE DE COSTOS */}

            {serviceCosts.length > 0 && (
              <div className="card p-5">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-4 h-4 text-primary" />

                  <h3 className="font-semibold text-main text-sm">
                    Distribución de costos
                  </h3>
                </div>

                <div className="space-y-3">
                  {serviceCosts.map(
                    (item) => {
                      const percentage =
                        estimatedMonthlyCost > 0
                          ? (item.monthlyCost /
                              estimatedMonthlyCost) *
                            100
                          : 0

                      return (
                        <div key={item.id}>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="font-medium text-main">
                              {item.name}
                            </span>

                            <span className="text-muted">
                              $
                              {item.monthlyCost.toFixed(
                                2,
                              )}
                            </span>
                          </div>

                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full transition-all"
                              style={{
                                width: `${percentage}%`,
                              }}
                            />
                          </div>
                        </div>
                      )
                    },
                  )}
                </div>
              </div>
            )}

            {/* REGIÓN */}

            <div className="card p-5">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-primary" />

                <h3 className="font-semibold text-main text-sm">
                  Región seleccionada
                </h3>
              </div>

              <div className="p-3 rounded-lg bg-blue-50/60">
                <p className="text-sm font-bold text-main">
                  {selectedRegion}
                </p>

                <p className="text-xs text-muted mt-1">
                  {currentRegion?.location}
                </p>

                <div className="flex items-center justify-between mt-3">
                  <span className="flex items-center gap-2 text-[11px] text-muted">
                    <span className="w-2 h-2 rounded-full bg-security" />
                    Región disponible
                  </span>

                  <span className="text-[10px] font-medium text-primary">
                    {currentRegion?.deployedServices.length ?? 0}{' '}
                    servicios base
                  </span>
                </div>
              </div>
            </div>

            {/* ARQUITECTURA */}

            <div className="card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-4 h-4 text-primary" />

                <h3 className="font-semibold text-main text-sm">
                  Arquitectura seleccionada
                </h3>
              </div>

              {selectedServiceData.length > 0 ? (
                <div className="space-y-2">
                  {selectedServiceData.map(
                    (service) => {
                      const Icon =
                        serviceIcons[
                          service.id
                        ] ?? Cloud

                      return (
                        <div
                          key={service.id}
                          className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50"
                        >
                          <div className="w-7 h-7 rounded-md bg-white border border-border flex items-center justify-center">
                            <Icon className="w-3.5 h-3.5 text-primary" />
                          </div>

                          <div className="flex-1">
                            <p className="text-xs font-semibold text-main">
                              {service.name}
                            </p>

                            <p className="text-[10px] text-muted">
                              {service.category}
                            </p>
                          </div>

                          <CheckCircle2 className="w-4 h-4 text-security" />
                        </div>
                      )
                    },
                  )}
                </div>
              ) : (
                <div className="text-center py-5 border border-dashed border-border rounded-lg">
                  <Cloud className="w-6 h-6 text-muted mx-auto" />

                  <p className="text-xs text-muted mt-2">
                    Selecciona servicios para visualizar
                    la arquitectura.
                  </p>
                </div>
              )}
            </div>

            {/* BOTÓN PREVISUALIZAR */}

            <button
              type="button"
              onClick={() =>
                setShowPreview(
                  !showPreview,
                )
              }
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-primary bg-white text-primary font-medium hover:bg-blue-50 transition-colors text-sm"
            >
              <Eye className="w-4 h-4" />

              {showPreview
                ? 'Ocultar vista previa'
                : 'Ver vista previa'}
            </button>
          </div>
        </div>

        {/* =========================================
            VISTA PREVIA
        ========================================= */}

        {showPreview && (
          <div className="card p-6 border-primary/30">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
              <div>
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />

                  <h2 className="text-lg font-semibold text-main">
                    Vista previa de la solución
                  </h2>
                </div>

                <p className="text-xs text-muted mt-1">
                  Así quedaría configurada la propuesta.
                </p>
              </div>

              <span className="text-xs font-semibold text-primary bg-blue-50 px-3 py-1.5 rounded-full">
                {progress}% completado
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 p-5 rounded-xl bg-slate-50 border border-border">
              <div className="px-4 py-3 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-sm">
                INTERNET
              </div>

              {selectedServices.includes(
                'route53',
              ) && (
                <>
                  <ChevronRight className="w-4 h-4 text-muted" />

                  <div className="px-4 py-3 rounded-xl bg-white border border-border text-xs font-semibold">
                    Route 53
                  </div>
                </>
              )}

              {selectedServices.includes(
                'cloudfront',
              ) && (
                <>
                  <ChevronRight className="w-4 h-4 text-muted" />

                  <div className="px-4 py-3 rounded-xl bg-white border border-border text-xs font-semibold">
                    CloudFront
                  </div>
                </>
              )}

              {selectedServices.includes(
                'vpc',
              ) && (
                <>
                  <ChevronRight className="w-4 h-4 text-muted" />

                  <div className="px-4 py-3 rounded-xl bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700">
                    VPC
                  </div>
                </>
              )}

              {selectedServices.includes(
                'ec2',
              ) && (
                <>
                  <ChevronRight className="w-4 h-4 text-muted" />

                  <div className="px-4 py-3 rounded-xl bg-white border border-border text-xs font-semibold">
                    EC2
                  </div>
                </>
              )}

              {selectedServices.includes(
                'rds',
              ) && (
                <>
                  <ChevronRight className="w-4 h-4 text-muted" />

                  <div className="px-4 py-3 rounded-xl bg-white border border-border text-xs font-semibold">
                    RDS
                  </div>
                </>
              )}

              {selectedServices.includes(
                's3',
              ) && (
                <>
                  <span className="text-muted font-bold">
                    +
                  </span>

                  <div className="px-4 py-3 rounded-xl bg-white border border-border text-xs font-semibold">
                    S3
                  </div>
                </>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                <div className="text-[11px] text-blue-600">
                  Región
                </div>

                <div className="font-bold text-main mt-1">
                  {selectedRegion}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-green-50 border border-green-100">
                <div className="text-[11px] text-green-600">
                  Disponibilidad
                </div>

                <div className="font-bold text-main mt-1">
                  {availability
                    ? availability.split(
                        ' - ',
                      )[0]
                    : 'No definida'}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
                <div className="text-[11px] text-amber-600">
                  Costo mensual
                </div>

                <div className="font-bold text-main mt-1">
                  $
                  {estimatedMonthlyCost.toFixed(
                    2,
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================
            ÚLTIMA PROPUESTA
        ========================================= */}

        {latestProposal && (
          <div className="card overflow-hidden">
            <div className="p-5 border-b border-border bg-gradient-to-r from-blue-50/70 to-white">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />

                    <span className="text-xs font-bold uppercase tracking-wide text-primary">
                      Última propuesta registrada
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-main mt-2">
                    {latestProposal.solutionName}
                  </h2>

                  <p className="text-xs text-muted mt-1">
                    {latestProposal.applicationType}{' '}
                    · {latestProposal.region}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      editProposal(
                        latestProposal,
                      )
                    }
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-white text-main text-xs font-medium hover:bg-slate-50"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Editar
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      duplicateProposal(
                        latestProposal,
                      )
                    }
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-white text-main text-xs font-medium hover:bg-slate-50"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Duplicar
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      exportProposal(
                        latestProposal,
                      )
                    }
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-white text-main text-xs font-medium hover:bg-slate-50"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Exportar
                  </button>
                </div>
              </div>
            </div>

            <div className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <p className="text-[11px] text-muted">
                  Usuarios
                </p>

                <p className="font-bold text-main mt-1">
                  {latestProposal.users.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-[11px] text-muted">
                  Disponibilidad
                </p>

                <p className="font-bold text-security mt-1">
                  {
                    latestProposal.availability.split(
                      ' - ',
                    )[0]
                  }
                </p>
              </div>

              <div>
                <p className="text-[11px] text-muted">
                  Costo mensual
                </p>

                <p className="font-bold text-main mt-1">
                  $
                  {latestProposal.monthlyCost.toFixed(
                    2,
                  )}
                </p>
              </div>

              <div>
                <p className="text-[11px] text-muted">
                  Registrado
                </p>

                <p className="font-bold text-main mt-1">
                  {latestProposal.createdAt}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* =========================================
            HISTORIAL
        ========================================= */}

        <div className="card p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />

              <div>
                <h2 className="text-lg font-semibold text-main">
                  Historial de propuestas
                </h2>

                <p className="text-xs text-muted mt-0.5">
                  Las propuestas permanecen guardadas
                  aunque actualices la página.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(
                      event.target.value,
                    )
                  }
                  placeholder="Buscar propuesta..."
                  className="w-full sm:w-64 pl-9 pr-3 py-2 rounded-lg border border-border bg-white text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <span className="inline-flex items-center justify-center text-xs font-semibold px-3 py-2 rounded-lg bg-slate-100 text-muted">
                {filteredProposals.length}{' '}
                resultados
              </span>
            </div>
          </div>

          {filteredProposals.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border bg-slate-50 text-muted font-semibold">
                    <th className="p-3">
                      ID
                    </th>

                    <th className="p-3">
                      Solución
                    </th>

                    <th className="p-3">
                      Región
                    </th>

                    <th className="p-3">
                      Usuarios
                    </th>

                    <th className="p-3">
                      Servicios
                    </th>

                    <th className="p-3">
                      Costo mensual
                    </th>

                    <th className="p-3">
                      Fecha
                    </th>

                    <th className="p-3">
                      Acciones
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredProposals.map(
                    (proposal) => (
                      <tr
                        key={proposal.id}
                        className="border-b border-border hover:bg-slate-50/60 transition-colors"
                      >
                        <td className="p-3">
                          <span className="font-bold text-primary">
                            {proposal.id}
                          </span>
                        </td>

                        <td className="p-3">
                          <div>
                            <p className="font-semibold text-main">
                              {
                                proposal.solutionName
                              }
                            </p>

                            <p className="text-[10px] text-muted mt-0.5">
                              {
                                proposal.applicationType
                              }
                            </p>
                          </div>
                        </td>

                        <td className="p-3">
                          <div>
                            <p className="font-medium text-main">
                              {proposal.region}
                            </p>

                            <p className="text-[10px] text-muted">
                              {getRegionLocation(
                                proposal.region,
                              )}
                            </p>
                          </div>
                        </td>

                        <td className="p-3 font-medium">
                          {proposal.users.toLocaleString()}
                        </td>

                        <td className="p-3">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {proposal.services.map(
                              (serviceId) => (
                                <span
                                  key={serviceId}
                                  className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-[10px]"
                                >
                                  {getServiceName(
                                    serviceId,
                                  )}
                                </span>
                              ),
                            )}
                          </div>
                        </td>

                        <td className="p-3">
                          <span className="font-bold text-main">
                            $
                            {proposal.monthlyCost.toFixed(
                              2,
                            )}
                          </span>
                        </td>

                        <td className="p-3 text-muted">
                          {
                            proposal.createdAt
                          }
                        </td>

                        <td className="p-3">
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() =>
                                editProposal(
                                  proposal,
                                )
                              }
                              title="Editar"
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-primary hover:bg-blue-50 transition-colors"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                duplicateProposal(
                                  proposal,
                                )
                              }
                              title="Duplicar"
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
                            >
                              <Copy className="w-4 h-4" />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                exportProposal(
                                  proposal,
                                )
                              }
                              title="Exportar"
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-emerald-600 hover:bg-emerald-50 transition-colors"
                            >
                              <Download className="w-4 h-4" />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                deleteProposal(
                                  proposal.id,
                                )
                              }
                              title="Eliminar"
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-10 border border-dashed border-border rounded-xl">
              <Search className="w-9 h-9 text-muted mx-auto" />

              <h3 className="font-semibold text-main mt-3">
                {proposals.length > 0
                  ? 'No se encontraron propuestas'
                  : 'No hay propuestas registradas'}
              </h3>

              <p className="text-xs text-muted mt-1">
                {proposals.length > 0
                  ? 'Prueba con otro término de búsqueda.'
                  : 'Completa el formulario superior para registrar tu primera solución Cloud.'}
              </p>

              {searchTerm && (
                <button
                  type="button"
                  onClick={() =>
                    setSearchTerm('')
                  }
                  className="mt-3 text-xs font-medium text-primary hover:underline"
                >
                  Limpiar búsqueda
                </button>
              )}
            </div>
          )}
        </div>

        {/* =========================================
            ARQUITECTURA FINAL
        ========================================= */}

        {selectedServices.length > 0 && (
          <div className="card p-6">
            <div className="flex items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2">
                <Network className="w-5 h-5 text-primary" />

                <div>
                  <h2 className="text-lg font-semibold text-main">
                    Arquitectura de la propuesta
                  </h2>

                  <p className="text-xs text-muted">
                    Representación visual basada en los
                    servicios seleccionados.
                  </p>
                </div>
              </div>

              <span className="text-xs font-semibold text-primary bg-blue-50 px-3 py-1.5 rounded-full">
                {selectedServices.length} servicios
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 p-5 rounded-xl bg-slate-50 border border-border">
              <div className="px-4 py-3 rounded-xl bg-slate-900 text-white text-xs font-semibold">
                INTERNET
              </div>

              {selectedServices.includes(
                'route53',
              ) && (
                <>
                  <ChevronRight className="w-4 h-4 text-muted" />

                  <div className="px-4 py-3 rounded-xl bg-white border border-border text-xs font-semibold">
                    Route 53
                  </div>
                </>
              )}

              {selectedServices.includes(
                'cloudfront',
              ) && (
                <>
                  <ChevronRight className="w-4 h-4 text-muted" />

                  <div className="px-4 py-3 rounded-xl bg-white border border-border text-xs font-semibold">
                    CloudFront
                  </div>
                </>
              )}

              {selectedServices.includes(
                'vpc',
              ) && (
                <>
                  <ChevronRight className="w-4 h-4 text-muted" />

                  <div className="px-4 py-3 rounded-xl bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700">
                    VPC
                  </div>
                </>
              )}

              {selectedServices.includes(
                'ec2',
              ) && (
                <>
                  <ChevronRight className="w-4 h-4 text-muted" />

                  <div className="px-4 py-3 rounded-xl bg-white border border-border text-xs font-semibold">
                    EC2
                  </div>
                </>
              )}

              {selectedServices.includes(
                'rds',
              ) && (
                <>
                  <ChevronRight className="w-4 h-4 text-muted" />

                  <div className="px-4 py-3 rounded-xl bg-white border border-border text-xs font-semibold">
                    RDS
                  </div>
                </>
              )}

              {selectedServices.includes(
                's3',
              ) && (
                <>
                  <span className="text-muted font-bold">
                    +
                  </span>

                  <div className="px-4 py-3 rounded-xl bg-white border border-border text-xs font-semibold">
                    S3
                  </div>
                </>
              )}

              {selectedServices.includes(
                'iam',
              ) && (
                <>
                  <span className="text-muted font-bold">
                    +
                  </span>

                  <div className="px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-xs font-semibold text-green-700">
                    IAM
                  </div>
                </>
              )}
            </div>

            {/* OBJETIVOS */}

            {migrationObjectives.length > 0 && (
              <div className="mt-5">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-4 h-4 text-primary" />

                  <span className="text-xs font-semibold text-main">
                    Objetivos de la propuesta
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {migrationObjectives.map(
                    (objective) => (
                      <span
                        key={objective}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-medium"
                      >
                        <Check className="w-3 h-3" />
                        {objective}
                      </span>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Planning