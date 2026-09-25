import React, { FormEvent, useEffect, useMemo, useState } from 'react'
import {
  AlertCircle,
  Archive,
  ArrowLeft,
  ArrowRight,
  Calculator,
  Check,
  CheckCircle2,
  ChevronDown,
  Cloud,
  Copy,
  Database,
  DollarSign,
  Edit3,
  FileText,
  Globe2,
  HardDrive,
  Layers,
  MapPin,
  Network,
  Plus,
  RefreshCw,
  Save,
  Search,
  Server,
  Shield,
  Trash2,
  Users,
  Wifi,
  X,
  Zap,
} from 'lucide-react'

import { awsServices, costEstimates, regions } from '../data/awsServices'

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
  budget: number
  monthlyCost: number
  annualCost: number
  readiness: number
  createdAt: string
}

type Step = 1 | 2 | 3 | 4 | 5

const migrationOptions = [
  'Migración de aplicación',
  'Modernización de aplicación',
  'Migración de base de datos',
  'Implementación de nueva aplicación',
  'Respaldo y recuperación',
]

const applicationOptions = [
  'Aplicación web',
  'Sistema empresarial',
  'API / Backend',
  'Sistema de gestión',
  'Aplicación de datos',
]

const availabilityOptions = [
  'Básica',
  'Alta',
  'Crítica',
]

const quickConfigurations = [
  {
    name: 'Aplicación web básica',
    description: 'Configuración inicial para una aplicación web.',
    services: ['EC2', 'S3', 'RDS'],
    availability: 'Básica',
    users: 100,
  },
  {
    name: 'Aplicación web alta disponibilidad',
    description: 'Configuración orientada a disponibilidad y distribución.',
    services: ['EC2', 'S3', 'RDS', 'CloudFront', 'Route 53', 'VPC', 'IAM'],
    availability: 'Alta',
    users: 500,
  },
  {
    name: 'Arquitectura completa',
    description: 'Configuración con todos los servicios principales.',
    services: ['EC2', 'S3', 'RDS', 'IAM', 'VPC', 'Route 53', 'CloudFront'],
    availability: 'Crítica',
    users: 1000,
  },
]

const steps = [
  {
    number: 1,
    title: 'Información',
    description: 'Datos de la solución',
    icon: FileText,
  },
  {
    number: 2,
    title: 'Capacidad',
    description: 'Usuarios y disponibilidad',
    icon: Users,
  },
  {
    number: 3,
    title: 'Servicios',
    description: 'Servicios AWS',
    icon: Layers,
  },
  {
    number: 4,
    title: 'Objetivos',
    description: 'Objetivos de migración',
    icon: Zap,
  },
  {
    number: 5,
    title: 'Resumen',
    description: 'Revisión final',
    icon: CheckCircle2,
  },
]

const Planning = (): JSX.Element => {
  const [currentStep, setCurrentStep] = useState<Step>(1)

  const [solutionName, setSolutionName] = useState('')
  const [applicationType, setApplicationType] = useState('Aplicación web')
  const [description, setDescription] = useState('')
  const [region, setRegion] = useState('us-east-1')
  const [users, setUsers] = useState(100)
  const [availability, setAvailability] = useState('Básica')
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'EC2',
    'S3',
    'RDS',
  ])
  const [migrationObjectives, setMigrationObjectives] = useState<string[]>([
    'Migración de aplicación',
  ])

  const [proposals, setProposals] = useState<CloudProposal[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showHistory, setShowHistory] = useState(true)
  const [notification, setNotification] = useState('')
  const [draftSaved, setDraftSaved] = useState(false)

  useEffect(() => {
    try {
      const savedProposals = localStorage.getItem('cloudops-proposals')

      if (savedProposals) {
        setProposals(JSON.parse(savedProposals))
      }
    } catch {
      setProposals([])
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cloudops-proposals', JSON.stringify(proposals))
  }, [proposals])

  useEffect(() => {
    const draft = {
      solutionName,
      applicationType,
      description,
      region,
      users,
      availability,
      selectedServices,
      migrationObjectives,
      currentStep,
    }

    localStorage.setItem('cloudops-planning-draft', JSON.stringify(draft))
  }, [
    solutionName,
    applicationType,
    description,
    region,
    users,
    availability,
    selectedServices,
    migrationObjectives,
    currentStep,
  ])

  useEffect(() => {
    if (!notification) return

    const timer = window.setTimeout(() => {
      setNotification('')
    }, 3500)

    return () => window.clearTimeout(timer)
  }, [notification])

  const selectedRegionData = useMemo(
    () => regions.find((item) => item.code === region),
    [region],
  )

  const monthlyCost = useMemo(() => {
    return selectedServices.reduce((total, serviceName) => {
      const cost = costEstimates.find(
        (item) => item.serviceName === serviceName,
      )

      return total + (cost?.monthlyCost ?? 0)
    }, 0)
  }, [selectedServices])

  const annualCost = monthlyCost * 12

  const readiness = useMemo(() => {
    let score = 40

    if (solutionName.trim()) score += 10
    if (description.trim()) score += 10
    if (region) score += 5
    if (users > 0) score += 5
    if (availability) score += 5
    if (selectedServices.length >= 3) score += 10
    if (selectedServices.includes('IAM')) score += 5
    if (selectedServices.includes('VPC')) score += 5
    if (migrationObjectives.length > 0) score += 5

    return Math.min(score, 100)
  }, [
    solutionName,
    description,
    region,
    users,
    availability,
    selectedServices,
    migrationObjectives,
  ])

  const capacityLevel = useMemo(() => {
    if (users >= 1000) return 'Alta'
    if (users >= 500) return 'Media'
    return 'Básica'
  }, [users])

  const filteredProposals = useMemo(() => {
    const search = searchTerm.trim().toLowerCase()

    if (!search) return proposals

    return proposals.filter(
      (proposal) =>
        proposal.solutionName.toLowerCase().includes(search) ||
        proposal.id.toLowerCase().includes(search) ||
        proposal.region.toLowerCase().includes(search),
    )
  }, [proposals, searchTerm])

  const getServiceName = (id: string) => {
    const service = awsServices.find((item) => item.id === id)
    return service?.name ?? id
  }

  const getServiceIcon = (serviceName: string) => {
    const name = serviceName.toUpperCase()

    if (name === 'EC2') return Server
    if (name === 'S3') return HardDrive
    if (name === 'RDS') return Database
    if (name === 'IAM') return Shield
    if (name === 'VPC') return Network
    if (name === 'ROUTE 53') return Globe2
    if (name === 'CLOUDFRONT') return Wifi

    return Cloud
  }

  const getRegionLocation = (code: string) => {
    const item = regions.find((item) => item.code === code)
    return item?.location ?? code
  }

  const readinessLabel = () => {
    if (readiness >= 85) return 'Listo para implementar'
    if (readiness >= 65) return 'Bien encaminado'
    if (readiness >= 45) return 'En planificación'
    return 'Pendiente'
  }

  const readinessClass = () => {
    if (readiness >= 85) return 'text-security'
    if (readiness >= 65) return 'text-primary'
    if (readiness >= 45) return 'text-costs'
    return 'text-alerts'
  }

  const toggleService = (serviceName: string) => {
    setSelectedServices((current) =>
      current.includes(serviceName)
        ? current.filter((item) => item !== serviceName)
        : [...current, serviceName],
    )
  }

  const toggleObjective = (objective: string) => {
    setMigrationObjectives((current) =>
      current.includes(objective)
        ? current.filter((item) => item !== objective)
        : [...current, objective],
    )
  }

  const applyQuickConfiguration = (
    configuration: (typeof quickConfigurations)[number],
  ) => {
    setSolutionName(configuration.name)
    setDescription(configuration.description)
    setServices(configuration.services)
    setAvailability(configuration.availability)
    setUsers(configuration.users)
    setCurrentStep(1)

    setNotification(`Configuración "${configuration.name}" aplicada`)
  }

  const setServices = (services: string[]) => {
    setSelectedServices(services)
  }

  const resetForm = () => {
    setCurrentStep(1)
    setSolutionName('')
    setApplicationType('Aplicación web')
    setDescription('')
    setRegion('us-east-1')
    setUsers(100)
    setAvailability('Básica')
    setSelectedServices(['EC2', 'S3', 'RDS'])
    setMigrationObjectives(['Migración de aplicación'])
    setEditingId(null)
    setDraftSaved(false)
  }

  const saveDraft = () => {
    localStorage.setItem(
      'cloudops-planning-draft',
      JSON.stringify({
        solutionName,
        applicationType,
        description,
        region,
        users,
        availability,
        selectedServices,
        migrationObjectives,
        currentStep,
      }),
    )

    setDraftSaved(true)
    setNotification('Borrador guardado correctamente')
  }

  const validateStep = (step: Step) => {
    if (step === 1) {
      if (!solutionName.trim()) {
        setNotification('Ingresa el nombre de la solución')
        return false
      }

      if (!description.trim()) {
        setNotification('Ingresa una descripción')
        return false
      }
    }

    if (step === 2) {
      if (users <= 0) {
        setNotification('La cantidad de usuarios debe ser mayor a 0')
        return false
      }
    }

    if (step === 3) {
      if (selectedServices.length === 0) {
        setNotification('Selecciona al menos un servicio AWS')
        return false
      }
    }

    if (step === 4) {
      if (migrationObjectives.length === 0) {
        setNotification('Selecciona al menos un objetivo')
        return false
      }
    }

    return true
  }

  const nextStep = () => {
    if (!validateStep(currentStep)) return

    if (currentStep < 5) {
      setCurrentStep((currentStep + 1) as Step)
    }
  }

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step)
    }
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (
      !validateStep(1) ||
      !validateStep(2) ||
      !validateStep(3) ||
      !validateStep(4)
    ) {
      return
    }

    const proposal: CloudProposal = {
      id: editingId ?? `PROP-${Date.now()}`,
      solutionName: solutionName.trim(),
      applicationType,
      description: description.trim(),
      region,
      users,
      availability,
      services: selectedServices,
      migrationObjectives,
      budget: annualCost,
      monthlyCost,
      annualCost,
      readiness,
      createdAt: new Date().toLocaleString('es-PE'),
    }

    localStorage.setItem(
      'cloudops-active-proposal',
      JSON.stringify(proposal),
    )

    if (editingId) {
      setProposals((current) =>
        current.map((item) =>
          item.id === editingId ? proposal : item,
        ),
      )

      setNotification('Propuesta actualizada correctamente')
    } else {
      setProposals((current) => [proposal, ...current])
      setNotification('Propuesta registrada correctamente')
    }

    setEditingId(null)
    setShowHistory(true)
    setCurrentStep(5)
    localStorage.removeItem('cloudops-planning-draft')
  }

  const editProposal = (proposal: CloudProposal) => {
    setEditingId(proposal.id)
    setSolutionName(proposal.solutionName)
    setApplicationType(proposal.applicationType)
    setDescription(proposal.description)
    setRegion(proposal.region)
    setUsers(proposal.users)
    setAvailability(proposal.availability)
    setSelectedServices(proposal.services)
    setMigrationObjectives(proposal.migrationObjectives)
    setCurrentStep(1)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const duplicateProposal = (proposal: CloudProposal) => {
    const duplicated: CloudProposal = {
      ...proposal,
      id: `PROP-${Date.now()}`,
      solutionName: `${proposal.solutionName} - Copia`,
      createdAt: new Date().toLocaleString('es-PE'),
    }

    setProposals((current) => [duplicated, ...current])
    setNotification('Propuesta duplicada correctamente')
  }

  const deleteProposal = (id: string) => {
    setProposals((current) =>
      current.filter((proposal) => proposal.id !== id),
    )

    setNotification('Propuesta eliminada')
  }

  const recommendedServices = useMemo(() => {
    const recommendations = new Set<string>()

    recommendations.add('EC2')
    recommendations.add('S3')

    if (availability === 'Alta' || availability === 'Crítica') {
      recommendations.add('CloudFront')
      recommendations.add('Route 53')
      recommendations.add('VPC')
    }

    if (users >= 500) {
      recommendations.add('RDS')
    }

    if (availability === 'Crítica') {
      recommendations.add('IAM')
    }

    return Array.from(recommendations)
  }, [availability, users])

  return (
    <div className="space-y-4">
      {notification && (
        <div className="fixed right-6 top-6 z-50">
          <div className="card px-4 py-3 shadow-lg flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-security" />
            <span className="text-sm font-medium">{notification}</span>
            <button
              type="button"
              onClick={() => setNotification('')}
              className="text-muted hover:text-main"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="text-sm text-muted mb-1">
            CloudOps Dashboard
          </div>
          <h1 className="text-main-title">Planificación Cloud</h1>
          <p className="text-muted mt-2">
            Diseña y registra una propuesta de solución utilizando servicios
            de AWS.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={saveDraft}
            className="px-4 py-2 rounded-lg border border-border bg-white hover:bg-background flex items-center gap-2 text-sm"
          >
            <Save className="w-4 h-4" />
            {draftSaved ? 'Guardado' : 'Guardar borrador'}
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 rounded-lg bg-primary text-white hover:opacity-90 flex items-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" />
            Nueva propuesta
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickConfigurations.map((configuration) => (
          <button
            key={configuration.name}
            type="button"
            onClick={() => applyQuickConfiguration(configuration)}
            className="card p-4 text-left hover:border-primary transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-semibold text-main">
                  {configuration.name}
                </div>
                <div className="text-sm text-muted mt-1">
                  {configuration.description}
                </div>
              </div>

              <Zap className="w-5 h-5 text-primary shrink-0" />
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 rounded-full bg-background text-muted">
                {configuration.users} usuarios
              </span>

              <span className="text-xs px-2 py-1 rounded-full bg-background text-muted">
                {configuration.availability}
              </span>

              <span className="text-xs px-2 py-1 rounded-full bg-background text-muted">
                {configuration.services.length} servicios
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="card p-4">
        <div className="flex items-center justify-between gap-4 overflow-x-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            const active = currentStep === step.number
            const completed = currentStep > step.number

            return (
              <React.Fragment key={step.number}>
                <button
                  type="button"
                  onClick={() => {
                    if (step.number < currentStep) {
                      setCurrentStep(step.number as Step)
                    }
                  }}
                  className="flex items-center gap-3 min-w-max"
                >
                  <div
                    className={[
                      'w-10 h-10 rounded-full flex items-center justify-center shrink-0',
                      completed
                        ? 'bg-security text-white'
                        : active
                          ? 'bg-primary text-white'
                          : 'bg-background text-muted',
                    ].join(' ')}
                  >
                    {completed ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>

                  <div className="hidden sm:block text-left">
                    <div
                      className={`text-sm font-semibold ${
                        active || completed
                          ? 'text-main'
                          : 'text-muted'
                      }`}
                    >
                      {step.title}
                    </div>

                    <div className="text-xs text-muted">
                      {step.description}
                    </div>
                  </div>
                </button>

                {index < steps.length - 1 && (
                  <div className="hidden md:block flex-1 h-px bg-border min-w-8" />
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2 card p-5">
            {currentStep === 1 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-semibold text-main">
                    Información de la solución
                  </h2>
                  <p className="text-sm text-muted mt-1">
                    Define los datos principales de la propuesta Cloud.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Nombre de la solución
                  </label>

                  <input
                    value={solutionName}
                    onChange={(event) =>
                      setSolutionName(event.target.value)
                    }
                    placeholder="Ej. Sistema de ventas Cloud"
                    className="w-full border border-border rounded-lg px-3 py-2.5 outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Tipo de aplicación
                  </label>

                  <select
                    value={applicationType}
                    onChange={(event) =>
                      setApplicationType(event.target.value)
                    }
                    className="w-full border border-border rounded-lg px-3 py-2.5 outline-none focus:border-primary bg-white"
                  >
                    {applicationOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Descripción
                  </label>

                  <textarea
                    value={description}
                    onChange={(event) =>
                      setDescription(event.target.value)
                    }
                    rows={5}
                    placeholder="Describe brevemente la solución que deseas planificar..."
                    className="w-full border border-border rounded-lg px-3 py-2.5 outline-none focus:border-primary resize-none"
                  />

                  <div className="text-xs text-muted mt-1">
                    Explica el propósito principal de la aplicación.
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Región AWS
                  </label>

                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted" />

                    <select
                      value={region}
                      onChange={(event) =>
                        setRegion(event.target.value)
                      }
                      className="w-full border border-border rounded-lg pl-9 pr-3 py-2.5 outline-none focus:border-primary bg-white"
                    >
                      {regions.map((item) => (
                        <option key={item.code} value={item.code}>
                          {item.code} - {item.location}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-semibold text-main">
                    Capacidad y disponibilidad
                  </h2>
                  <p className="text-sm text-muted mt-1">
                    Define la cantidad estimada de usuarios y el nivel de
                    disponibilidad.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Usuarios estimados
                  </label>

                  <div className="relative">
                    <Users className="absolute left-3 top-3 w-4 h-4 text-muted" />

                    <input
                      type="number"
                      min={1}
                      value={users}
                      onChange={(event) =>
                        setUsers(Math.max(1, Number(event.target.value)))
                      }
                      className="w-full border border-border rounded-lg pl-9 pr-3 py-2.5 outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {availabilityOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setAvailability(option)}
                      className={[
                        'p-4 rounded-lg border text-left transition-colors',
                        availability === option
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary',
                      ].join(' ')}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{option}</span>

                        {availability === option && (
                          <Check className="w-4 h-4 text-primary" />
                        )}
                      </div>

                      <div className="text-xs text-muted mt-2">
                        {option === 'Básica' &&
                          'Para soluciones de baja demanda.'}

                        {option === 'Alta' &&
                          'Para aplicaciones que requieren mayor disponibilidad.'}

                        {option === 'Crítica' &&
                          'Para soluciones con alta exigencia de continuidad.'}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="card p-4 bg-background">
                  <div className="flex items-center gap-3">
                    <Calculator className="w-5 h-5 text-primary" />

                    <div>
                      <div className="font-semibold">
                        Nivel de capacidad
                      </div>
                      <div className="text-sm text-muted">
                        Capacidad estimada: {capacityLevel}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="card p-4">
                    <div className="text-sm text-muted">
                      Usuarios
                    </div>
                    <div className="text-2xl font-bold mt-1">
                      {users.toLocaleString('es-PE')}
                    </div>
                  </div>

                  <div className="card p-4">
                    <div className="text-sm text-muted">
                      Disponibilidad
                    </div>
                    <div className="text-2xl font-bold mt-1">
                      {availability}
                    </div>
                  </div>

                  <div className="card p-4">
                    <div className="text-sm text-muted">
                      Región
                    </div>
                    <div className="text-lg font-bold mt-2">
                      {region}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-semibold text-main">
                    Servicios AWS
                  </h2>
                  <p className="text-sm text-muted mt-1">
                    Selecciona los servicios que formarán parte de la
                    solución.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {awsServices.map((service) => {
                    const selected = selectedServices.includes(
                      service.name,
                    )
                    const Icon = getServiceIcon(service.name)

                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => toggleService(service.name)}
                        className={[
                          'p-4 rounded-lg border text-left transition-all',
                          selected
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary',
                        ].join(' ')}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div
                              className={[
                                'w-10 h-10 rounded-lg flex items-center justify-center',
                                selected
                                  ? 'bg-primary text-white'
                                  : 'bg-background text-muted',
                              ].join(' ')}
                            >
                              <Icon className="w-5 h-5" />
                            </div>

                            <div>
                              <div className="font-semibold">
                                {service.name}
                              </div>

                              <div className="text-xs text-muted">
                                {service.category}
                              </div>
                            </div>
                          </div>

                          {selected && (
                            <Check className="w-5 h-5 text-primary shrink-0" />
                          )}
                        </div>

                        <div className="text-sm text-muted mt-3">
                          {service.description}
                        </div>
                      </button>
                    )
                  })}
                </div>

                <div className="card p-4 bg-background">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">
                        Servicios seleccionados
                      </div>

                      <div className="text-sm text-muted mt-1">
                        {selectedServices.length} servicio(s)
                      </div>
                    </div>

                    <div className="text-2xl font-bold text-primary">
                      {selectedServices.length}
                    </div>
                  </div>

                  {selectedServices.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {selectedServices.map((service) => (
                        <span
                          key={service}
                          className="px-3 py-1.5 rounded-full bg-white border border-border text-sm flex items-center gap-2"
                        >
                          {service}

                          <button
                            type="button"
                            onClick={() => toggleService(service)}
                            className="text-muted hover:text-alerts"
                            aria-label={`Quitar ${service}`}
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-4 h-4 text-costs" />
                    <span className="font-semibold">
                      Servicios recomendados
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {recommendedServices.map((service) => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => {
                          if (!selectedServices.includes(service)) {
                            setSelectedServices((current) => [
                              ...current,
                              service,
                            ])
                          }
                        }}
                        className={[
                          'px-3 py-1.5 rounded-full text-xs border',
                          selectedServices.includes(service)
                            ? 'border-security text-security bg-security/5'
                            : 'border-border text-muted hover:border-primary',
                        ].join(' ')}
                      >
                        {service}
                        {selectedServices.includes(service) && ' ✓'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-semibold text-main">
                    Objetivos de migración
                  </h2>

                  <p className="text-sm text-muted mt-1">
                    Selecciona los objetivos principales de la propuesta.
                  </p>
                </div>

                <div className="space-y-3">
                  {migrationOptions.map((objective) => {
                    const selected =
                      migrationObjectives.includes(objective)

                    return (
                      <button
                        key={objective}
                        type="button"
                        onClick={() => toggleObjective(objective)}
                        className={[
                          'w-full p-4 rounded-lg border text-left flex items-center justify-between transition-colors',
                          selected
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary',
                        ].join(' ')}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={[
                              'w-9 h-9 rounded-lg flex items-center justify-center',
                              selected
                                ? 'bg-primary text-white'
                                : 'bg-background text-muted',
                            ].join(' ')}
                          >
                            {selected ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <ArrowRight className="w-4 h-4" />
                            )}
                          </div>

                          <span className="font-medium">
                            {objective}
                          </span>
                        </div>

                        {selected && (
                          <span className="text-xs font-semibold text-primary">
                            Seleccionado
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>

                <div className="card p-4 bg-background">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-costs mt-0.5" />

                    <div>
                      <div className="font-semibold">
                        Objetivos seleccionados
                      </div>

                      <div className="text-sm text-muted mt-1">
                        {migrationObjectives.length > 0
                          ? migrationObjectives.join(', ')
                          : 'No se ha seleccionado ningún objetivo.'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-semibold text-main">
                    Resumen de la propuesta
                  </h2>

                  <p className="text-sm text-muted mt-1">
                    Revisa la información antes de registrar la propuesta.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="card p-4">
                    <div className="text-sm text-muted">
                      Nombre
                    </div>
                    <div className="font-semibold mt-1">
                      {solutionName || 'Sin nombre'}
                    </div>
                  </div>

                  <div className="card p-4">
                    <div className="text-sm text-muted">
                      Tipo de aplicación
                    </div>
                    <div className="font-semibold mt-1">
                      {applicationType}
                    </div>
                  </div>

                  <div className="card p-4">
                    <div className="text-sm text-muted">
                      Región
                    </div>
                    <div className="font-semibold mt-1">
                      {region}
                    </div>
                    <div className="text-xs text-muted mt-1">
                      {getRegionLocation(region)}
                    </div>
                  </div>

                  <div className="card p-4">
                    <div className="text-sm text-muted">
                      Usuarios estimados
                    </div>
                    <div className="font-semibold mt-1">
                      {users.toLocaleString('es-PE')}
                    </div>
                  </div>

                  <div className="card p-4">
                    <div className="text-sm text-muted">
                      Disponibilidad
                    </div>
                    <div className="font-semibold mt-1">
                      {availability}
                    </div>
                  </div>

                  <div className="card p-4">
                    <div className="text-sm text-muted">
                      Servicios
                    </div>
                    <div className="font-semibold mt-1">
                      {selectedServices.length}
                    </div>
                  </div>
                </div>

                <div className="card p-4">
                  <div className="text-sm text-muted">
                    Descripción
                  </div>
                  <div className="mt-2 text-sm">
                    {description || 'Sin descripción'}
                  </div>
                </div>

                <div className="card p-4">
                  <div className="text-sm text-muted mb-3">
                    Servicios AWS seleccionados
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedServices.map((service) => (
                      <span
                        key={service}
                        className="px-3 py-1.5 rounded-full bg-background border border-border text-sm"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="card p-4">
                  <div className="text-sm text-muted mb-3">
                    Objetivos
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {migrationObjectives.map((objective) => (
                      <span
                        key={objective}
                        className="px-3 py-1.5 rounded-full bg-background border border-border text-sm"
                      >
                        {objective}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="card p-4">
                    <div className="flex items-center gap-2 text-muted">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-sm">
                        Costo mensual
                      </span>
                    </div>

                    <div className="text-2xl font-bold mt-2">
                      ${monthlyCost.toFixed(2)}
                    </div>
                  </div>

                  <div className="card p-4">
                    <div className="flex items-center gap-2 text-muted">
                      <Calculator className="w-4 h-4" />
                      <span className="text-sm">
                        Costo anual
                      </span>
                    </div>

                    <div className="text-2xl font-bold mt-2">
                      ${annualCost.toFixed(2)}
                    </div>
                  </div>

                  <div className="card p-4">
                    <div className="text-sm text-muted">
                      Preparación
                    </div>

                    <div
                      className={`text-2xl font-bold mt-2 ${readinessClass()}`}
                    >
                      {readiness}%
                    </div>

                    <div className="text-xs text-muted mt-1">
                      {readinessLabel()}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between gap-3 mt-8 pt-5 border-t border-border">
              <button
                type="button"
                onClick={previousStep}
                disabled={currentStep === 1}
                className={[
                  'px-4 py-2.5 rounded-lg border border-border flex items-center gap-2',
                  currentStep === 1
                    ? 'opacity-40 cursor-not-allowed'
                    : 'hover:bg-background',
                ].join(' ')}
              >
                <ArrowLeft className="w-4 h-4" />
                Anterior
              </button>

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-5 py-2.5 rounded-lg bg-primary text-white flex items-center gap-2 hover:opacity-90"
                >
                  Siguiente
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-security text-white flex items-center gap-2 hover:opacity-90"
                >
                  <Save className="w-4 h-4" />
                  {editingId
                    ? 'Actualizar propuesta'
                    : 'Registrar propuesta'}
                </button>
              )}
            </div>
          </div>

          <div className="space-y-5">
            <div className="card p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">
                    Resumen actual
                  </div>

                  <div className="text-xs text-muted mt-1">
                    Estado de la planificación
                  </div>
                </div>

                <Cloud className="w-6 h-6 text-primary" />
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">
                    Preparación
                  </span>

                  <span className={`font-semibold ${readinessClass()}`}>
                    {readiness}%
                  </span>
                </div>

                <div className="w-full h-2.5 rounded-full bg-background mt-2 overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${readiness}%` }}
                  />
                </div>

                <div className={`text-sm font-medium mt-2 ${readinessClass()}`}>
                  {readinessLabel()}
                </div>
              </div>

              <div className="space-y-3 mt-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">
                    Región
                  </span>
                  <span className="text-sm font-medium">
                    {region}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">
                    Usuarios
                  </span>
                  <span className="text-sm font-medium">
                    {users.toLocaleString('es-PE')}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">
                    Servicios
                  </span>
                  <span className="text-sm font-medium">
                    {selectedServices.length}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">
                    Costo mensual
                  </span>
                  <span className="text-sm font-semibold">
                    ${monthlyCost.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="card p-5">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <div className="font-semibold">
                  Región seleccionada
                </div>
              </div>

              <div className="mt-4">
                <div className="text-lg font-bold">
                  {region}
                </div>

                <div className="text-sm text-muted mt-1">
                  {getRegionLocation(region)}
                </div>
              </div>

              {selectedRegionData && (
                <div className="mt-4">
                  <div className="text-xs text-muted mb-2">
                    Servicios planificados en esta región
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedRegionData.plannedServices.map(
                      (service) => (
                        <span
                          key={service}
                          className="text-xs px-2 py-1 rounded-full bg-background border border-border"
                        >
                          {service}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="card p-5">
              <div className="flex items-center gap-2">
                <Network className="w-5 h-5 text-security" />
                <div className="font-semibold">
                  Arquitectura propuesta
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-background text-sm">
                  <Globe2 className="w-4 h-4 text-primary" />
                  Internet
                </div>

                <div className="flex justify-center">
                  <ArrowDownIcon />
                </div>

                {selectedServices.includes('Route 53') && (
                  <>
                    <div className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-background text-sm">
                      <Globe2 className="w-4 h-4 text-primary" />
                      Route 53
                    </div>

                    <div className="flex justify-center">
                      <ArrowDownIcon />
                    </div>
                  </>
                )}

                {selectedServices.includes('CloudFront') && (
                  <>
                    <div className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-background text-sm">
                      <Wifi className="w-4 h-4 text-primary" />
                      CloudFront
                    </div>

                    <div className="flex justify-center">
                      <ArrowDownIcon />
                    </div>
                  </>
                )}

                {selectedServices.includes('VPC') && (
                  <>
                    <div className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-background text-sm">
                      <Network className="w-4 h-4 text-security" />
                      VPC
                    </div>

                    <div className="flex justify-center">
                      <ArrowDownIcon />
                    </div>
                  </>
                )}

                <div className="grid grid-cols-2 gap-2">
                  {selectedServices.includes('EC2') && (
                    <div className="flex flex-col items-center justify-center gap-1 p-3 rounded-lg bg-background text-sm">
                      <Server className="w-5 h-5 text-primary" />
                      EC2
                    </div>
                  )}

                  {selectedServices.includes('RDS') && (
                    <div className="flex flex-col items-center justify-center gap-1 p-3 rounded-lg bg-background text-sm">
                      <Database className="w-5 h-5 text-primary" />
                      RDS
                    </div>
                  )}

                  {selectedServices.includes('S3') && (
                    <div className="flex flex-col items-center justify-center gap-1 p-3 rounded-lg bg-background text-sm">
                      <HardDrive className="w-5 h-5 text-primary" />
                      S3
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className="card">
        <div className="p-5 border-b border-border flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">
              Propuestas registradas
            </h2>

            <p className="text-sm text-muted mt-1">
              Historial de propuestas de planificación Cloud.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted" />

              <input
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                placeholder="Buscar propuesta..."
                className="border border-border rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>

            <button
              type="button"
              onClick={() => setShowHistory((current) => !current)}
              className="px-3 py-2 rounded-lg border border-border hover:bg-background text-sm"
            >
              {showHistory ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
        </div>

        {showHistory && (
          <div className="p-5">
            {filteredProposals.length === 0 ? (
              <div className="py-10 text-center">
                <Archive className="w-10 h-10 text-muted mx-auto" />

                <div className="font-semibold mt-3">
                  No hay propuestas registradas
                </div>

                <div className="text-sm text-muted mt-1">
                  Registra una propuesta para verla en este historial.
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <div className="min-w-[820px]">
                  <div className="grid grid-cols-[1.6fr_1fr_1fr_0.9fr_0.7fr] gap-3 border-b border-border pb-3 text-xs font-semibold uppercase tracking-wide text-muted">
                    <span>Solución</span>
                    <span>Región</span>
                    <span>Usuarios</span>
                    <span>Costo</span>
                    <span className="text-right">Acciones</span>
                  </div>

                  <div className="space-y-2 mt-3">
                    {filteredProposals.map((proposal) => (
                      <div
                        key={proposal.id}
                        className="grid grid-cols-[1.6fr_1fr_1fr_0.9fr_0.7fr] items-center gap-3 border border-border rounded-lg px-3 py-2.5 bg-background/40"
                      >
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-main">
                              {proposal.solutionName}
                            </span>

                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-security/5 text-security">
                              {proposal.readiness}%
                            </span>
                          </div>

                          <div className="text-[11px] text-muted mt-1">
                            {proposal.applicationType}
                          </div>
                        </div>

                        <div className="text-sm text-main">
                          {proposal.region}
                        </div>

                        <div className="text-sm text-main">
                          {proposal.users.toLocaleString('es-PE')}
                        </div>

                        <div>
                          <div className="text-sm font-semibold text-main">
                            ${proposal.monthlyCost.toFixed(2)}
                          </div>
                          <div className="text-[11px] text-muted">
                            {proposal.createdAt}
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => editProposal(proposal)}
                            className="p-2 rounded-lg border border-border hover:bg-background"
                            title="Editar"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => duplicateProposal(proposal)}
                            className="p-2 rounded-lg border border-border hover:bg-background"
                            title="Duplicar"
                          >
                            <Copy className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteProposal(proposal.id)}
                            className="p-2 rounded-lg border border-border hover:bg-red-50 text-alerts"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => {
            localStorage.removeItem('cloudops-planning-draft')
            resetForm()
            setNotification('Formulario reiniciado')
          }}
          className="text-sm text-muted hover:text-main flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Reiniciar planificación
        </button>
      </div>
    </div>
  )
}

const ArrowDownIcon = () => (
  <ArrowRight className="w-4 h-4 text-muted rotate-90" />
)

export default Planning