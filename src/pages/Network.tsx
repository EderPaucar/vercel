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
  description: 'Punto de entrada global de peticiones HTTPS procedentes de usuarios finales.',
  specifications: ['Soporte IPv4 / IPv6', 'Tráfico encriptado TLS 1.3', 'Protección contra ataques volumétricos']
 },
 {
  id: 'route53',
  name: 'AWS Route 53',
  type: 'DNS y Enrutamiento',
  status: 'ok',
  description: 'Servicio de DNS de alta disponibilidad que gestiona la resolución de nombres del dominio.',
  specifications: ['Enrutamiento basado en latencia', 'Health Checks activos con conmutación por error', 'Soporte para registros A/AAAA alias']
 },
 {
  id: 'cloudfront',
  name: 'Amazon CloudFront',
  type: 'Red de Entrega de Contenido (CDN)',
  status: 'ok',
  description: 'Capa de almacenamiento en caché geográfica para entrega ultra rápida de activos estáticos y dinámicos.',
  specifications: ['Integración directa con AWS WAF', 'Caché perimetral en Edge Locations', 'Certificado SSL/TLS administrado por ACM']
 },
 {
  id: 'vpc',
  name: 'Amazon VPC',
  type: 'Aislamiento de Red Virtual',
  status: 'ok',
  description: 'Red lógica aislada dentro de AWS donde se ejecutan los recursos internos de la solución.',
  specifications: ['Rango CIDR principal: 10.0.0.0/16', 'Subredes Públicas y Privadas multi-AZ', 'Internet Gateway y NAT Gateways configurados']
 },
 {
  id: 'ec2_rds',
  name: 'Recursos Internos (EC2 / RDS)',
  type: 'Cómputo y Base de Datos',
  status: 'ok',
  description: 'Servidores de aplicación dentro de la VPC conectados a la base de datos relacional de alta disponibilidad.',
  specifications: ['Instancias EC2 en Auto Scaling Group', 'Base de datos RDS PostgreSQL (Multi-AZ)', 'Grupos de Seguridad (Security Groups) estrictos']
 }
]

const Network = (): JSX.Element => {
 const [activeNode, setActiveNode] = useState<NodeDetail>(networkNodes[0])

 return (
  <div className="space-y-6">
   {/* Encabezado Principal */}
   <div>
    <h1 className="text-main-title">Módulo 6 – Arquitectura de Red</h1>
    <p className="text-muted">
     Representación interactiva de la infraestructura de red en tiempo real: INTERNET → Route 53 → CloudFront → VPC → EC2/RDS.
    </p>
   </div>

   {/* Indicadores de métricas de red */}
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
    <div className="card p-4">
     <div className="text-sm text-muted">Estado del Flujo</div>
     <div className="text-2xl font-bold mt-1 text-emerald-500">Operativo</div>
    </div>
    <div className="card p-4">
     <div className="text-sm text-muted">Latencia Global</div>
     <div className="text-2xl font-bold mt-1">14 ms</div>
    </div>
    <div className="card p-4">
     <div className="text-sm text-muted">Bloque VPC CIDR</div>
     <div className="text-2xl font-bold mt-1">10.0.0.0/16</div>
    </div>
    <div className="card p-4">
     <div className="text-sm text-muted">Región Principal</div>
     <div className="text-2xl font-bold mt-1">us-east-1</div>
    </div>
   </div>

   {/* Diagrama de Red Gráfico (SVG interactivo) */}
   <div className="card p-6 overflow-x-auto">
    <div className="flex justify-between items-center mb-4">
     <h2 className="text-lg font-semibold">Diagrama Visual de Arquitectura de Red</h2>
     <span className="text-xs bg-blue-100 text-blue-800 font-semibold px-2.5 py-1 rounded-full">
      Renderizado Nativo Web (Sin imágenes estáticas)
     </span>
    </div>

    <div className="min-w-[760px] py-2">
     <svg width="100%" height="160" viewBox="0 0 800 160" className="w-full">
      <defs>
       <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
        <path d="M0 0 L8 4 L0 8 z" fill="#3B82F6" />
       </marker>
      </defs>

      {/* Líneas de conexión del flujo */}
      <line x1="130" y1="80" x2="175" y2="80" stroke="#3B82F6" strokeWidth="2.5" strokeDasharray="5,5" markerEnd="url(#arrow)" />
      <line x1="285" y1="80" x2="330" y2="80" stroke="#3B82F6" strokeWidth="2.5" strokeDasharray="5,5" markerEnd="url(#arrow)" />
      <line x1="440" y1="80" x2="485" y2="80" stroke="#3B82F6" strokeWidth="2.5" strokeDasharray="5,5" markerEnd="url(#arrow)" />
      <line x1="595" y1="80" x2="640" y2="80" stroke="#3B82F6" strokeWidth="2.5" strokeDasharray="5,5" markerEnd="url(#arrow)" />

      {/* Bloque 1: Internet */}
      <g className="cursor-pointer" onClick={() => setActiveNode(networkNodes[0])}>
       <rect x="10" y="45" width="120" height="70" rx="10" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
       <text x="70" y="77" textAnchor="middle" className="text-sm font-bold" fill="#0369A1">INTERNET</text>
       <text x="70" y="95" textAnchor="middle" className="text-xs" fill="#0284C7">Tráfico Público</text>
      </g>

      {/* Bloque 2: Route 53 */}
      <g className="cursor-pointer" onClick={() => setActiveNode(networkNodes[1])}>
       <rect x="175" y="45" width="110" height="70" rx="10" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
       <text x="230" y="77" textAnchor="middle" className="text-sm font-bold" fill="#B45309">Route 53</text>
       <text x="230" y="95" textAnchor="middle" className="text-xs" fill="#D97706">DNS Routing</text>
      </g>

      {/* Bloque 3: CloudFront */}
      <g className="cursor-pointer" onClick={() => setActiveNode(networkNodes[2])}>
       <rect x="330" y="45" width="110" height="70" rx="10" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2" />
       <text x="385" y="77" textAnchor="middle" className="text-sm font-bold" fill="#15803D">CloudFront</text>
       <text x="385" y="95" textAnchor="middle" className="text-xs" fill="#16A34A">CDN / Cache</text>
      </g>

      {/* Bloque 4: VPC */}
      <g className="cursor-pointer" onClick={() => setActiveNode(networkNodes[3])}>
       <rect x="485" y="45" width="110" height="70" rx="10" fill="#F3E8FF" stroke="#9333EA" strokeWidth="2" />
       <text x="540" y="77" textAnchor="middle" className="text-sm font-bold" fill="#7E22CE">VPC AWS</text>
       <text x="540" y="95" textAnchor="middle" className="text-xs" fill="#9333EA">Red Aislada</text>
      </g>

      {/* Bloque 5: EC2 / RDS */}
      <g className="cursor-pointer" onClick={() => setActiveNode(networkNodes[4])}>
       <rect x="640" y="45" width="130" height="70" rx="10" fill="#F1F5F9" stroke="#475569" strokeWidth="2" />
       <text x="705" y="77" textAnchor="middle" className="text-sm font-bold" fill="#334155">EC2 / RDS</text>
       <text x="705" y="95" textAnchor="middle" className="text-xs" fill="#64748B">Recursos Internos</text>
      </g>
     </svg>
    </div>
    <p className="text-xs text-muted text-center mt-2">
     👉 Haz clic en cualquiera de los componentes del diagrama para inspeccionar sus especificaciones técnicas.
    </p>
   </div>

   {/* Detalle del componente seleccionado */}
   <div className="card p-6 border-l-4 border-blue-500">
    <div className="flex flex-wrap justify-between items-center gap-2">
     <div>
      <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
       {activeNode.type}
      </span>
      <h3 className="text-xl font-bold mt-1">{activeNode.name}</h3>
     </div>
     <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full">
      Estado: {activeNode.status.toUpperCase()}
     </span>
    </div>

    <p className="text-sm text-muted mt-3">{activeNode.description}</p>

    <div className="mt-4 pt-4 border-t border-border">
     <h4 className="text-xs font-bold uppercase text-muted mb-2">Especificaciones de Configuración:</h4>
     <ul className="list-disc list-inside space-y-1 text-sm">
      {activeNode.specifications.map((spec, index) => (
       <li key={index} className="text-foreground">{spec}</li>
      ))}
     </ul>
    </div>
   </div>

   {/* Desglose de Subredes dentro de la VPC */}
   <div className="card p-6">
    <h3 className="text-lg font-semibold mb-3">Distribución de Subredes (VPC Topology)</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
     <div className="border border-border rounded-lg p-4 bg-muted/10">
      <div className="font-semibold text-sm">Subred Pública (Public Subnet)</div>
      <div className="text-xs text-muted mt-0.5">Rango: 10.0.1.0/24 | Zonas: us-east-1a / us-east-1b</div>
      <p className="text-xs text-muted mt-2">
       Conectada al Internet Gateway. Alberga balanceadores de carga (ALB) y puertas de enlace NAT Gateway.
      </p>
     </div>

     <div className="border border-border rounded-lg p-4 bg-muted/10">
      <div className="font-semibold text-sm">Subred Privada (Private Subnet)</div>
      <div className="text-xs text-muted mt-0.5">Rango: 10.0.2.0/24 | Zonas: us-east-1a / us-east-1b</div>
      <p className="text-xs text-muted mt-2">
       Sin acceso público directo. Concentra instancias de servidor EC2 y bases de datos relacionales RDS PostgreSQL.
      </p>
     </div>
    </div>
   </div>
  </div>
 )
}

export default Network