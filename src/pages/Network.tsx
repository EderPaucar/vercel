import React, { useState } from 'react'

interface NodeDetail {
  id: string
  name: string
  type: string
  status: 'ok' | 'warning' | 'error'
  description: string
  specifications: string[]
}

const networkNodes: NodeDetail[] = [
  {
    id: 'internet',
    name: 'Internet (Clientes)',
    type: 'Origen de Tráfico',
    status: 'ok',
    description:
      'Punto de entrada global de peticiones HTTPS procedentes de usuarios finales.',
    specifications: [
      'Soporte IPv4 / IPv6',
      'Tráfico encriptado TLS 1.3',
      'Protección contra ataques volumétricos',
    ],
  },
  {
    id: 'route53',
    name: 'AWS Route 53',
    type: 'DNS y Enrutamiento',
    status: 'ok',
    description:
      'Servicio de DNS de alta disponibilidad que gestiona la resolución de nombres del dominio.',
    specifications: [
      'Enrutamiento basado en latencia',
      'Health Checks activos con conmutación por error',
      'Soporte para registros A/AAAA alias',
    ],
  },
  {
    id: 'cloudfront',
    name: 'Amazon CloudFront',
    type: 'Red de Entrega de Contenido (CDN)',
    status: 'ok',
    description:
      'Capa de almacenamiento en caché geográfica para entrega rápida de activos estáticos y dinámicos.',
    specifications: [
      'Integración directa con AWS WAF',
      'Caché perimetral en Edge Locations',
      'Certificado SSL/TLS administrado por ACM',
    ],
  },
  {
    id: 'vpc',
    name: 'Amazon VPC',
    type: 'Aislamiento de Red Virtual',
    status: 'ok',
    description:
      'Red lógica aislada dentro de AWS donde se ejecutan los recursos internos de la solución.',
    specifications: [
      'Rango CIDR principal: 10.0.0.0/16',
      'Subredes Públicas y Privadas multi-AZ',
      'Internet Gateway y NAT Gateways configurados',
    ],
  },
  {
    id: 'ec2_rds',
    name: 'Recursos Internos (EC2 / RDS)',
    type: 'Cómputo y Base de Datos',
    status: 'ok',
    description:
      'Servidores de aplicación dentro de la VPC conectados a la base de datos relacional de alta disponibilidad.',
    specifications: [
      'Instancias EC2 en Auto Scaling Group',
      'Base de datos RDS PostgreSQL (Multi-AZ)',
      'Grupos de Seguridad (Security Groups) estrictos',
    ],
  },
]

const Network = (): JSX.Element => {
  const [activeNode, setActiveNode] = useState<NodeDetail>(
    networkNodes[0],
  )

  return (
    <div className="space-y-4">

      {/* ENCABEZADO */}

      <div>
        <h1 className="text-main-title">
          Módulo 6 – Arquitectura de Red
        </h1>

        <p className="text-muted mt-1">
          Representación interactiva de la infraestructura de red:
          INTERNET → Route 53 → CloudFront → VPC → EC2/RDS.
        </p>
      </div>

      {/* INDICADORES */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">

        <div className="card p-4">
          <div className="text-sm text-muted">
            Estado del Flujo
          </div>

          <div className="text-2xl font-bold mt-1 text-security">
            Operativo
          </div>
        </div>

        <div className="card p-4">
          <div className="text-sm text-muted">
            Latencia Global
          </div>

          <div className="text-2xl font-bold mt-1 text-main">
            14 ms
          </div>
        </div>

        <div className="card p-4">
          <div className="text-sm text-muted">
            Bloque VPC CIDR
          </div>

          <div className="text-2xl font-bold mt-1 text-main">
            10.0.0.0/16
          </div>
        </div>

        <div className="card p-4">
          <div className="text-sm text-muted">
            Región Principal
          </div>

          <div className="text-2xl font-bold mt-1 text-main">
            us-east-1
          </div>
        </div>

      </div>

      {/* DIAGRAMA DE RED */}

      <div className="card p-4 overflow-x-auto">

        <div className="flex justify-between items-center mb-4 gap-3">

          <h2 className="text-lg font-semibold text-main">
            Diagrama Visual de Arquitectura de Red
          </h2>

          <span className="text-xs bg-blue-100 text-blue-800 font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
            Renderizado nativo web
          </span>

        </div>

        <div className="min-w-[980px] py-2">

          <svg
            width="100%"
            height="250"
            viewBox="0 0 1000 250"
            className="w-full"
            role="img"
            aria-label="Arquitectura de red desde Internet hasta Route 53, CloudFront, VPC, EC2 y RDS"
          >

            <defs>
              <marker
                id="network-arrow"
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="4"
                orient="auto"
              >
                <path d="M0 0 L8 4 L0 8 z" fill="#3B82F6" />
              </marker>
            </defs>

            <text x="25" y="24" className="text-xs font-bold" fill="#64748B">
              ENTRADA PÚBLICA
            </text>

            <text x="525" y="24" className="text-xs font-bold" fill="#7E22CE">
              AWS VPC · 10.0.0.0/16
            </text>

            {/* Flujo principal */}
            <line x1="130" y1="105" x2="170" y2="105" stroke="#3B82F6" strokeWidth="2.5" strokeDasharray="5,5" markerEnd="url(#network-arrow)" />
            <line x1="290" y1="105" x2="330" y2="105" stroke="#3B82F6" strokeWidth="2.5" strokeDasharray="5,5" markerEnd="url(#network-arrow)" />
            <line x1="450" y1="105" x2="510" y2="105" stroke="#3B82F6" strokeWidth="2.5" strokeDasharray="5,5" markerEnd="url(#network-arrow)" />

            {/* VPC como contenedor */}
            <rect x="510" y="35" width="465" height="195" rx="16" fill="#FAF5FF" stroke="#9333EA" strokeWidth="2.5" strokeDasharray="8,5" />
            <text x="535" y="57" className="text-xs" fill="#7E22CE">
              Red aislada con subredes multi-AZ
            </text>

            {/* INTERNET */}
            <g className="cursor-pointer" onClick={() => setActiveNode(networkNodes[0])}>
              <rect x="10" y="70" width="120" height="70" rx="10" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
              <text x="70" y="102" textAnchor="middle" className="text-sm font-bold" fill="#0369A1">INTERNET</text>
              <text x="70" y="120" textAnchor="middle" className="text-xs" fill="#0284C7">Usuarios HTTPS</text>
            </g>

            {/* ROUTE 53 */}
            <g className="cursor-pointer" onClick={() => setActiveNode(networkNodes[1])}>
              <rect x="170" y="70" width="120" height="70" rx="10" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
              <text x="230" y="102" textAnchor="middle" className="text-sm font-bold" fill="#B45309">Route 53</text>
              <text x="230" y="120" textAnchor="middle" className="text-xs" fill="#D97706">DNS / Health Checks</text>
            </g>

            {/* CLOUDFRONT */}
            <g className="cursor-pointer" onClick={() => setActiveNode(networkNodes[2])}>
              <rect x="330" y="70" width="120" height="70" rx="10" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2" />
              <text x="390" y="102" textAnchor="middle" className="text-sm font-bold" fill="#15803D">CloudFront</text>
              <text x="390" y="120" textAnchor="middle" className="text-xs" fill="#16A34A">CDN / WAF / TLS</text>
            </g>

            {/* VPC */}
            <g className="cursor-pointer" onClick={() => setActiveNode(networkNodes[3])}>
              <rect x="530" y="70" width="180" height="135" rx="10" fill="#F3E8FF" stroke="#A855F7" strokeWidth="1.5" />
              <text x="620" y="94" textAnchor="middle" className="text-sm font-bold" fill="#7E22CE">VPC AWS</text>
              <text x="620" y="111" textAnchor="middle" className="text-xs" fill="#9333EA">Subred pública</text>
              <text x="620" y="133" textAnchor="middle" className="text-xs" fill="#7E22CE">Internet Gateway</text>
              <text x="620" y="151" textAnchor="middle" className="text-xs" fill="#7E22CE">NAT Gateway</text>
              <text x="620" y="177" textAnchor="middle" className="text-[10px]" fill="#9333EA">us-east-1a / us-east-1b</text>
            </g>

            {/* Recursos internos */}
            <line x1="710" y1="137" x2="735" y2="137" stroke="#64748B" strokeWidth="2" markerEnd="url(#network-arrow)" />
            <g className="cursor-pointer" onClick={() => setActiveNode(networkNodes[4])}>
              <rect x="735" y="70" width="215" height="135" rx="10" fill="#F8FAFC" stroke="#475569" strokeWidth="2" />
              <text x="842" y="92" textAnchor="middle" className="text-sm font-bold" fill="#334155">SUBRED PRIVADA</text>
              <rect x="755" y="108" width="175" height="35" rx="7" fill="#E0F2FE" stroke="#0284C7" />
              <text x="842" y="130" textAnchor="middle" className="text-xs font-bold" fill="#0369A1">EC2 · Aplicación</text>
              <line x1="842" y1="143" x2="842" y2="157" stroke="#64748B" strokeWidth="2" markerEnd="url(#network-arrow)" />
              <rect x="755" y="162" width="175" height="30" rx="7" fill="#F1F5F9" stroke="#475569" />
              <text x="842" y="181" textAnchor="middle" className="text-xs font-bold" fill="#334155">RDS · PostgreSQL</text>
            </g>

          </svg>

        </div>

        <p className="text-xs text-muted text-center mt-2">
          Haz clic en cualquiera de los componentes del diagrama
          para inspeccionar sus especificaciones técnicas.
        </p>

      </div>

      {/* DETALLE DEL COMPONENTE */}

      <div className="card p-4 border-l-4 border-blue-500">

        <div className="flex flex-wrap justify-between items-center gap-2">

          <div>

            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              {activeNode.type}
            </span>

            <h3 className="text-xl font-bold mt-1 text-main">
              {activeNode.name}
            </h3>

          </div>

          <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full">
            Estado: {activeNode.status.toUpperCase()}
          </span>

        </div>

        <p className="text-sm text-muted mt-3">
          {activeNode.description}
        </p>

        <div className="mt-4 pt-4 border-t border-border">

          <h4 className="text-xs font-bold uppercase text-muted mb-2">
            Especificaciones de Configuración:
          </h4>

          <ul className="list-disc list-inside space-y-1 text-sm text-main">

            {activeNode.specifications.map(
              (spec, index) => (
                <li key={index}>
                  {spec}
                </li>
              ),
            )}

          </ul>

        </div>

      </div>

      {/* DISTRIBUCIÓN DE SUBREDES */}

      <div className="card p-4">

        <h3 className="text-lg font-semibold text-main mb-3">
          Distribución de Subredes (VPC Topology)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="border border-border rounded-lg p-4 bg-background">

            <div className="font-semibold text-sm text-main">
              Subred Pública (Public Subnet)
            </div>

            <div className="text-xs text-muted mt-1">
              Rango: 10.0.1.0/24 | Zonas: us-east-1a / us-east-1b
            </div>

            <p className="text-xs text-muted mt-2">
              Conectada al Internet Gateway. Alberga
              balanceadores de carga (ALB) y puertas de enlace
              NAT Gateway.
            </p>

          </div>

          <div className="border border-border rounded-lg p-4 bg-background">

            <div className="font-semibold text-sm text-main">
              Subred Privada (Private Subnet)
            </div>

            <div className="text-xs text-muted mt-1">
              Rango: 10.0.2.0/24 | Zonas: us-east-1a / us-east-1b
            </div>

            <p className="text-xs text-muted mt-2">
              Sin acceso público directo. Concentra instancias
              de servidor EC2 y bases de datos relacionales
              RDS PostgreSQL.
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Network