import React, { useMemo, useState } from 'react'
import { Search, RotateCcw, CheckCircle2, Server } from 'lucide-react'

export interface AWSService {
  id: string
  name: string
  category: string
  description: string
  mainFunction: string
  status: 'Activo' | 'En uso' | 'Optimizado' | 'En evaluación'
}

// Lista de los 7 servicios mínimos requeridos por la práctica
const defaultAwsServices: AWSService[] = [
  {
    id: 'ec2',
    name: 'Amazon EC2',
    category: 'Cómputo',
    description:
      'Capacidad de cómputo escalable en la nube para ejecutar servidores de aplicación.',
    mainFunction:
      'Alojamiento del backend de la aplicación y microservicios.',
    status: 'Activo',
  },
  {
    id: 's3',
    name: 'Amazon S3',
    category: 'Almacenamiento',
    description:
      'Servicio de almacenamiento de objetos diseñado para almacenar y recuperar cualquier cantidad de datos.',
    mainFunction:
      'Almacenamiento de activos estáticos, imágenes, respaldos y logs.',
    status: 'En uso',
  },
  {
    id: 'rds',
    name: 'Amazon RDS',
    category: 'Bases de Datos',
    description:
      'Servicio de base de datos relacional administrado compatible con PostgreSQL y MySQL.',
    mainFunction:
      'Almacenamiento persistente de datos relacionales con Multi-AZ.',
    status: 'Activo',
  },
  {
    id: 'iam',
    name: 'AWS IAM',
    category: 'Seguridad e Identidad',
    description:
      'Administración de acceso e identidades a los recursos de AWS de forma segura.',
    mainFunction:
      'Gestión de roles, políticas de seguridad y control de accesos.',
    status: 'Optimizado',
  },
  {
    id: 'vpc',
    name: 'Amazon VPC',
    category: 'Redes y Contenido',
    description:
      'Red virtual aislada lógicamente para desplegar recursos en un entorno seguro.',
    mainFunction:
      'Aislamiento de infraestructura, subredes públicas/privadas y tablas de ruteo.',
    status: 'Activo',
  },
  {
    id: 'route53',
    name: 'Amazon Route 53',
    category: 'Redes y Contenido',
    description:
      'Servicio de DNS web escalable y de alta disponibilidad con comprobaciones de estado.',
    mainFunction:
      'Resolución de nombres de dominio y enrutamiento inteligente de tráfico.',
    status: 'En uso',
  },
  {
    id: 'cloudfront',
    name: 'Amazon CloudFront',
    category: 'Redes y CDN',
    description:
      'Red de entrega de contenido (CDN) rápida que entrega datos, videos y APIs de forma segura.',
    mainFunction:
      'Almacenamiento en caché en ubicaciones de borde (Edge) y reducción de latencia.',
    status: 'Activo',
  },
]

const Services = (): JSX.Element => {
  const [filterCategory, setFilterCategory] = useState<string>('Todas')
  const [filterStatus, setFilterStatus] = useState<string>('Todos')
  const [searchTerm, setSearchTerm] = useState<string>('')

  const categories = useMemo(
    () => [
      'Todas',
      ...Array.from(
        new Set(defaultAwsServices.map((service) => service.category)),
      ),
    ],
    [],
  )

  const statuses = useMemo(
    () => [
      'Todos',
      ...Array.from(
        new Set(defaultAwsServices.map((service) => service.status)),
      ),
    ],
    [],
  )

  const filteredServices = useMemo(() => {
    return defaultAwsServices.filter((service) => {
      const matchesCategory =
        filterCategory === 'Todas' ||
        service.category === filterCategory

      const matchesStatus =
        filterStatus === 'Todos' ||
        service.status === filterStatus

      const search = searchTerm.toLowerCase().trim()

      const matchesSearch =
        search === '' ||
        service.name.toLowerCase().includes(search) ||
        service.category.toLowerCase().includes(search) ||
        service.description.toLowerCase().includes(search) ||
        service.mainFunction.toLowerCase().includes(search)

      return matchesCategory && matchesStatus && matchesSearch
    })
  }, [filterCategory, filterStatus, searchTerm])

  const activeServices = defaultAwsServices.filter(
    (service) =>
      service.status === 'Activo' || service.status === 'En uso',
  ).length

  const resetFilters = (): void => {
    setFilterCategory('Todas')
    setFilterStatus('Todos')
    setSearchTerm('')
  }

  const getStatusClass = (status: AWSService['status']): string => {
    switch (status) {
      case 'Activo':
        return 'bg-emerald-100 text-emerald-800'
      case 'En uso':
        return 'bg-blue-100 text-blue-800'
      case 'Optimizado':
        return 'bg-amber-100 text-amber-800'
      case 'En evaluación':
        return 'bg-slate-100 text-slate-700'
      default:
        return 'bg-slate-100 text-slate-700'
    }
  }

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-main-title">Módulo 7 – Servicios AWS</h1>

        <p className="text-muted mt-1">
          Catálogo detallado de los servicios AWS utilizados en la
          infraestructura CloudOps.
        </p>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted">
                Total de Servicios
              </div>

              <div className="text-2xl font-bold mt-1 text-main">
                {defaultAwsServices.length}
              </div>
            </div>

            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <Server className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted">
                Servicios Activos
              </div>

              <div className="text-2xl font-bold mt-1 text-emerald-600">
                {activeServices}
              </div>
            </div>

            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted">
                Categorías Registradas
              </div>

              <div className="text-2xl font-bold mt-1 text-blue-600">
                {categories.length - 1}
              </div>
            </div>

            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <Server className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Buscador */}
      <div className="card p-4">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Buscar servicio, categoría o función..."
              className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg bg-white text-main outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="button"
            onClick={resetFilters}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border text-muted hover:bg-slate-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Limpiar filtros
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="card p-4 space-y-4">
        <div>
          <span className="text-sm text-muted font-medium block mb-2">
            Filtrar por categoría
          </span>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setFilterCategory(category)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  filterCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-muted hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="text-sm text-muted font-medium block mb-2">
            Filtrar por estado
          </span>

          <div className="flex flex-wrap gap-2">
            {statuses.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  filterStatus === status
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-muted hover:bg-slate-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resultado */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-main">
            Catálogo de Servicios
          </h2>

          <p className="text-sm text-muted mt-1">
            Mostrando {filteredServices.length} de{' '}
            {defaultAwsServices.length} servicios
          </p>
        </div>
      </div>

      {/* Lista */}
      <section>
        {filteredServices.length === 0 ? (
          <div className="card p-8 text-center">
            <Search className="w-8 h-8 mx-auto text-muted mb-3" />

            <h3 className="font-semibold text-main">
              No se encontraron servicios
            </h3>

            <p className="text-sm text-muted mt-1">
              Prueba con otro término de búsqueda o limpia los filtros.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="card p-5 flex flex-col justify-between space-y-4 border border-border hover:shadow-md transition-shadow"
              >
                {/* Encabezado */}
                <div>
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <h3 className="text-base font-bold text-main">
                        {service.name}
                      </h3>

                      <span className="inline-block text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded mt-1">
                        {service.category}
                      </span>
                    </div>

                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${getStatusClass(
                        service.status,
                      )}`}
                    >
                      {service.status}
                    </span>
                  </div>

                  {/* Descripción */}
                  <p className="text-xs text-muted mt-3 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Función principal */}
                <div className="pt-3 border-t border-border">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted">
                    Función principal:
                  </span>

                  <p className="text-xs font-medium text-main mt-1 leading-relaxed">
                    {service.mainFunction}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Services