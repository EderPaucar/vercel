import React from 'react'
import {
  Shield,
  Users,
  Lock,
  Database,
  FileCheck,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from 'lucide-react'

type SecurityStatus = 'ok' | 'warning' | 'error'

type SecurityItem = {
  id: string
  title: string
  description: string
  status: SecurityStatus
  recommendation: string
  icon: React.ElementType
}

const securityItems: SecurityItem[] = [
  {
    id: 'shared-responsibility',
    title: 'Responsabilidad compartida',
    description:
      'AWS se encarga de la seguridad de la infraestructura Cloud y el cliente de la seguridad dentro de la nube.',
    status: 'ok',
    recommendation:
      'El modelo de responsabilidad compartida está correctamente considerado.',
    icon: Shield,
  },
  {
    id: 'iam',
    title: 'IAM',
    description:
      'Gestión de identidades, usuarios, roles y permisos para controlar el acceso a los recursos AWS.',
    status: 'ok',
    recommendation:
      'Revisar periódicamente usuarios, roles y permisos asignados.',
    icon: Users,
  },
  {
    id: 'account-protection',
    title: 'Protección de cuentas',
    description:
      'Controles para proteger las cuentas Cloud mediante autenticación y buenas prácticas de acceso.',
    status: 'warning',
    recommendation:
      'Se recomienda revisar MFA y las credenciales de acceso.',
    icon: Lock,
  },
  {
    id: 'data-protection',
    title: 'Protección de datos',
    description:
      'Medidas para proteger los datos almacenados y transmitidos mediante controles de acceso y cifrado.',
    status: 'ok',
    recommendation:
      'Mantener el cifrado y las políticas de acceso actualizadas.',
    icon: Database,
  },
  {
    id: 'compliance',
    title: 'Cumplimiento',
    description:
      'Controles relacionados con políticas, auditoría y cumplimiento de los requisitos de seguridad.',
    status: 'warning',
    recommendation:
      'Revisar periódicamente las políticas y requisitos de cumplimiento.',
    icon: FileCheck,
  },
]

const getStatusInfo = (status: SecurityStatus) => {
  if (status === 'ok') {
    return {
      label: 'Correcto',
      icon: CheckCircle,
      container: 'bg-green-50 border-green-200',
      badge: 'bg-green-100 text-green-700',
      text: 'text-green-700',
    }
  }

  if (status === 'warning') {
    return {
      label: 'Requiere revisión',
      icon: AlertTriangle,
      container: 'bg-yellow-50 border-yellow-200',
      badge: 'bg-yellow-100 text-yellow-700',
      text: 'text-yellow-700',
    }
  }

  return {
    label: 'Problema',
    icon: XCircle,
    container: 'bg-red-50 border-red-200',
    badge: 'bg-red-100 text-red-700',
    text: 'text-red-700',
  }
}

const Security = (): JSX.Element => {
  const total = securityItems.length

  const correct = securityItems.filter(
    (item) => item.status === 'ok',
  ).length

  const warnings = securityItems.filter(
    (item) => item.status === 'warning',
  ).length

  const errors = securityItems.filter(
    (item) => item.status === 'error',
  ).length

  const score =
    total > 0 ? Math.round((correct / total) * 100) : 0

  return (
    <div className="space-y-4">

      {/* ENCABEZADO */}

      <div>
        <h1 className="text-main-title">
          Seguridad
        </h1>

        <p className="text-muted mt-1">
          Panel de seguridad para revisar los principales
          controles de la solución Cloud.
        </p>
      </div>

      {/* RESUMEN DE SEGURIDAD */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

        <div className="card p-4">
          <div className="text-sm text-muted">
            Estado general
          </div>

          <div className="text-3xl font-bold mt-2">
            {score}%
          </div>

          <div className="text-sm text-muted mt-1">
            Controles correctos
          </div>
        </div>

        <div className="card p-4">
          <div className="text-sm text-muted">
            Correctos
          </div>

          <div className="text-3xl font-bold mt-2 text-security">
            {correct}
          </div>

          <div className="text-sm text-muted mt-1">
            Controles sin observaciones
          </div>
        </div>

        <div className="card p-4">
          <div className="text-sm text-muted">
            Requieren revisión
          </div>

          <div className="text-3xl font-bold mt-2 text-costs">
            {warnings}
          </div>

          <div className="text-sm text-muted mt-1">
            Controles por revisar
          </div>
        </div>

        <div className="card p-4">
          <div className="text-sm text-muted">
            Problemas
          </div>

          <div className="text-3xl font-bold mt-2 text-alerts">
            {errors}
          </div>

          <div className="text-sm text-muted mt-1">
            Controles con problemas
          </div>
        </div>

      </div>

      {/* LEYENDA */}

      <section className="card p-3 md:p-5">

        <h2 className="text-lg font-semibold text-main">
          Indicadores de seguridad
        </h2>

        <p className="text-sm text-muted mt-1">
          Interpretación de los estados utilizados en el panel.
        </p>

        <div className="flex flex-wrap gap-3 mt-4">

          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 border border-green-200">
            <span className="w-3 h-3 rounded-full bg-green-500" />

            <span className="text-sm font-medium text-green-700">
              Verde — Correcto
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-yellow-50 border border-yellow-200">
            <span className="w-3 h-3 rounded-full bg-yellow-500" />

            <span className="text-sm font-medium text-yellow-700">
              Amarillo — Requiere revisión
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 border border-red-200">
            <span className="w-3 h-3 rounded-full bg-red-500" />

            <span className="text-sm font-medium text-red-700">
              Rojo — Problema
            </span>
          </div>

        </div>

      </section>

      {/* MODELO DE RESPONSABILIDAD COMPARTIDA */}

      <section className="card p-3 md:p-5">

        <div className="flex items-start gap-3">

          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 text-primary" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-main">
              Modelo de responsabilidad compartida
            </h2>

            <p className="text-sm text-muted mt-1">
              La seguridad Cloud se divide entre el proveedor
              y el cliente.
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">

          <div className="border border-border rounded-lg p-4">

            <div className="font-semibold text-main">
              AWS
            </div>

            <p className="text-sm text-muted mt-2">
              Seguridad de la infraestructura que ejecuta los
              servicios Cloud.
            </p>

            <div className="mt-3 flex items-center gap-2 text-sm text-security">
              <CheckCircle className="w-4 h-4" />
              Infraestructura Cloud
            </div>

          </div>

          <div className="border border-border rounded-lg p-4">

            <div className="font-semibold text-main">
              Cliente
            </div>

            <p className="text-sm text-muted mt-2">
              Configuración, datos, identidades, permisos y
              controles utilizados dentro de la nube.
            </p>

            <div className="mt-3 flex items-center gap-2 text-sm text-security">
              <CheckCircle className="w-4 h-4" />
              Configuración y acceso
            </div>

          </div>

        </div>

      </section>

      {/* CONTROLES DE SEGURIDAD */}

      <section>

        <div className="mb-4">

          <h2 className="text-lg font-semibold text-main">
            Controles de seguridad
          </h2>

          <p className="text-sm text-muted mt-1">
            Estado de los principales aspectos de seguridad
            de la solución.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">

          {securityItems.map((item) => {

            const statusInfo = getStatusInfo(item.status)
            const Icon = item.icon
            const StatusIcon = statusInfo.icon

            return (
              <div
                key={item.id}
                className={`card p-4 border ${statusInfo.container}`}
              >

                {/* ENCABEZADO */}

                <div className="flex items-start justify-between gap-3">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-lg bg-white border border-border flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-main">
                        {item.title}
                      </h3>
                    </div>

                  </div>

                  <StatusIcon
                    className={`w-5 h-5 ${statusInfo.text}`}
                  />

                </div>

                {/* ESTADO */}

                <div className="mt-4">

                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusInfo.badge}`}
                  >
                    {statusInfo.label}
                  </span>

                </div>

                {/* DESCRIPCIÓN */}

                <p className="text-sm text-muted mt-4 leading-6">
                  {item.description}
                </p>

                {/* RECOMENDACIÓN */}

                <div className="mt-4 pt-4 border-t border-border">

                  <div className="text-xs font-semibold text-main">
                    Recomendación
                  </div>

                  <p className="text-xs text-muted mt-1 leading-5">
                    {item.recommendation}
                  </p>

                </div>

              </div>
            )
          })}

        </div>

      </section>

      {/* RESUMEN FINAL */}

      <section className="card p-3 md:p-5">

        <div className="flex items-center gap-3">

          <Shield className="w-5 h-5 text-security" />

          <div>

            <h2 className="font-semibold text-main">
              Resumen de seguridad
            </h2>

            <p className="text-sm text-muted mt-1">
              Se han evaluado {total} controles de seguridad:
              {' '}
              {correct} correctos, {warnings} requieren
              revisión y {errors} presentan problemas.
            </p>

          </div>

        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-xl border border-green-200 bg-green-50 p-3">
            <div className="text-xs text-green-700 font-semibold uppercase tracking-wide">
              Estado saludable
            </div>
            <div className="mt-2 text-lg font-bold text-green-700">
              {correct}/{total}
            </div>
            <div className="text-xs text-green-700/80">
              Controles funcionando correctamente.
            </div>
          </div>

          <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-3">
            <div className="text-xs text-yellow-700 font-semibold uppercase tracking-wide">
              Atención
            </div>
            <div className="mt-2 text-lg font-bold text-yellow-700">
              {warnings}
            </div>
            <div className="text-xs text-yellow-700/80">
              Revisiones recomendadas antes de producción.
            </div>
          </div>

          <div className="rounded-xl border border-red-200 bg-red-50 p-3">
            <div className="text-xs text-red-700 font-semibold uppercase tracking-wide">
              Riesgo
            </div>
            <div className="mt-2 text-lg font-bold text-red-700">
              {errors}
            </div>
            <div className="text-xs text-red-700/80">
              Requiere corrección inmediata.
            </div>
          </div>
        </div>

      </section>

    </div>
  )
}

export default Security