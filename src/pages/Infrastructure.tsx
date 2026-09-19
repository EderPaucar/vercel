import React from 'react'
import { MapPin, Server, Activity } from 'lucide-react'
import { regions } from '../data/awsServices'

const Infrastructure = (): JSX.Element => {
 return (
  <div className="space-y-6">
   <div>
    <h1 className="text-main-title">
     Infraestructura Global
    </h1>

    <p className="text-muted mt-1">
     Visualización de las regiones AWS, ubicación,
     servicios desplegados y estado de la infraestructura.
    </p>
   </div>

   {/* Resumen global */}

   <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <div className="card p-4">
     <div className="text-sm text-muted">
      Regiones configuradas
     </div>

     <div className="text-3xl font-bold mt-2">
      {regions.length}
     </div>

     <div className="text-sm text-muted mt-1">
      Regiones consideradas
     </div>
    </div>

    <div className="card p-4">
     <div className="text-sm text-muted">
      Regiones activas
     </div>

     <div className="text-3xl font-bold mt-2 text-security">
      {
       regions.filter(
        (region) => region.status === 'active',
       ).length
      }
     </div>

     <div className="text-sm text-muted mt-1">
      Infraestructura operativa
     </div>
    </div>

    <div className="card p-4">
     <div className="text-sm text-muted">
      Servicios desplegados
     </div>

     <div className="text-3xl font-bold mt-2">
      {regions.reduce(
       (total, region) =>
        total + region.deployedServices.length,
       0,
      )}
     </div>

     <div className="text-sm text-muted mt-1">
      Recursos registrados
     </div>
    </div>
   </div>

   {/* Representación visual */}

   <section className="card p-4 md:p-6">
    <div className="flex items-center gap-3 mb-5">
     <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
      <Activity className="w-5 h-5 text-primary" />
     </div>

     <div>
      <h2 className="text-lg font-semibold">
       Mapa de infraestructura Cloud
      </h2>

      <p className="text-sm text-muted">
       Distribución visual de los recursos por región.
      </p>
     </div>
    </div>

    <div className="relative overflow-hidden rounded-xl border border-border bg-slate-50 p-6 md:p-10">

     {/* Fondo visual */}

     <div className="absolute inset-0 opacity-40">
      <div className="absolute left-1/4 top-1/4 w-32 h-32 rounded-full border border-primary/20" />
      <div className="absolute right-1/4 top-1/3 w-48 h-48 rounded-full border border-primary/10" />
      <div className="absolute left-1/2 bottom-1/4 w-24 h-24 rounded-full border border-primary/20" />
     </div>

     <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      {regions.map((region) => (
       <div
        key={region.id}
        className="bg-white border border-border rounded-xl p-5 shadow-sm"
       >
        {/* Región */}

        <div className="flex items-start justify-between gap-3">

         <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
           <MapPin className="w-5 h-5 text-primary" />
          </div>

          <div>
           <div className="font-semibold text-main">
            {region.code}
           </div>

           <div className="text-xs text-muted">
            Región AWS
           </div>
          </div>

         </div>

         {/* Estado */}

         <span
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
           region.status === 'active'
            ? 'bg-green-100 text-green-700'
            : 'bg-yellow-100 text-yellow-700'
          }`}
         >
          <span
           className={`w-1.5 h-1.5 rounded-full ${
            region.status === 'active'
             ? 'bg-green-600'
             : 'bg-yellow-600'
           }`}
          />

          {region.status === 'active'
           ? 'Activo'
           : 'Pendiente'}
         </span>

        </div>

        {/* Ubicación */}

        <div className="mt-5">
         <div className="text-xs text-muted">
          Ubicación
         </div>

         <div className="font-medium text-main mt-1">
          {region.location}
         </div>
        </div>

        {/* Servicios */}

        <div className="mt-5">

         <div className="flex items-center justify-between mb-2">

          <div className="flex items-center gap-2">
           <Server className="w-4 h-4 text-muted" />

           <span className="text-sm font-medium">
            Servicios desplegados
           </span>
          </div>

          <span className="text-xs text-muted">
           {region.deployedServices.length}
          </span>

         </div>

         <div className="flex flex-wrap gap-2">

          {region.deployedServices.map(
           (service) => (
            <span
             key={service}
             className="px-2.5 py-1 rounded-md bg-slate-100 border border-border text-xs text-main"
            >
             {service}
            </span>
           ),
          )}

         </div>

        </div>

       </div>
      ))}

     </div>
    </div>
   </section>

   {/* Detalle de regiones */}

   <section className="card p-4 md:p-6">

    <h2 className="text-lg font-semibold">
     Detalle de infraestructura
    </h2>

    <p className="text-sm text-muted mt-1">
     Información de cada región configurada.
    </p>

    <div className="mt-5 overflow-x-auto">

     <table className="w-full text-sm">

      <thead>
       <tr className="border-b border-border text-left">

        <th className="py-3 px-3 font-semibold">
         Región
        </th>

        <th className="py-3 px-3 font-semibold">
         Ubicación
        </th>

        <th className="py-3 px-3 font-semibold">
         Servicios desplegados
        </th>

        <th className="py-3 px-3 font-semibold">
         Estado
        </th>

       </tr>
      </thead>

      <tbody>

       {regions.map((region) => (

        <tr
         key={region.id}
         className="border-b border-border last:border-b-0"
        >

         <td className="py-4 px-3 font-medium">
          {region.code}
         </td>

         <td className="py-4 px-3 text-muted">
          {region.location}
         </td>

         <td className="py-4 px-3">

          <div className="flex flex-wrap gap-1.5">

           {region.deployedServices.map(
            (service) => (
             <span
              key={service}
              className="px-2 py-1 rounded-md bg-slate-100 text-xs"
             >
              {service}
             </span>
            ),
           )}

          </div>

         </td>

         <td className="py-4 px-3">

          <span
           className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
            region.status === 'active'
             ? 'bg-green-100 text-green-700'
             : 'bg-yellow-100 text-yellow-700'
           }`}
          >
           {region.status === 'active'
            ? 'Activo'
            : 'Pendiente'}
          </span>

         </td>

        </tr>

       ))}

      </tbody>

     </table>

    </div>

   </section>
  </div>
 )
}

export default Infrastructure