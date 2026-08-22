import { useNavigate } from 'react-router';

function Services() {
  const navigate = useNavigate();

  const servicesList = [
    {
      category: 'MÓDULO CORE',
      title: 'Control de Asistencia Digital',
      description: 'Monitoreo en tiempo real de entradas, salidas y turnos con validación geográfica y registro inmediato.',
      metric: '99.9% Precisión'
    },
    {
      category: 'ANALÍTICA',
      title: 'Reportes y Métricas Automatizadas',
      description: 'Generación de informes de tardanzas, horas extras y ausencias exportables al instante.',
      metric: 'Exportación en 1-Clic'
    },
    {
      category: 'GESTIÓN RH',
      title: 'Flujo de Solicitudes y Permisos',
      description: 'Plataforma para gestionar vacaciones, licencias médicas y justificaciones con un flujo de aprobación intuitivo.',
      metric: 'Cero Papeleo'
    },
    {
      category: 'INTEGRACIÓN',
      title: 'Conexión REST API & Bases de Datos',
      description: 'Sincronización de registros de personal directamente con bases de datos centralizadas y sistemas externos.',
      metric: 'Sincronización Total'
    }
  ];

  return (
    <div style={{ backgroundColor: '#0b0f19', minHeight: '100vh', color: '#f8fafc', fontFamily: 'sans-serif', padding: '60px 40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px', borderBottom: '1px solid #1e293b', paddingBottom: '20px' }}>
          <div>
            <span style={{ color: '#38bdf8', fontSize: '13px', fontWeight: 'bold', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              SOLUCIONES CMR SYSTEM
            </span>
            <h1 style={{ fontSize: '38px', fontWeight: 'bold', marginTop: '10px', color: '#ffffff' }}>
              Módulos y Servicios
            </h1>
          </div>
          <button onClick={() => navigate('/contacto')} style={{ backgroundColor: '#0284c7', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
            Solicitar Demostración
          </button>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px' }}>
          {servicesList.map((item, index) => (
            <div key={index} style={{ backgroundColor: '#111827', borderRadius: '16px', padding: '40px', border: '1px solid #1f2937', position: 'relative', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 'bold', letterSpacing: '1px' }}>
                  {item.category}
                </span>
                <span style={{ fontSize: '12px', color: '#9ca3af', backgroundColor: '#1f2937', padding: '4px 10px', borderRadius: '12px' }}>
                  {item.metric}
                </span>
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#f3f4f6', marginBottom: '12px' }}>
                {item.title}
              </h2>
              <p style={{ color: '#9ca3af', fontSize: '15px', lineHeight: '1.6' }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <section style={{ marginTop: '60px', backgroundColor: '#1e293b', borderRadius: '16px', padding: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #334155' }}>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff', marginBottom: '6px' }}>
              ¿Requieres un módulo adaptado a tu empresa?
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
              Desarrollamos e integramos funcionalidades específicas según el flujo de tu organización.
            </p>
          </div>
          <button onClick={() => navigate('/contacto')} style={{ backgroundColor: '#ffffff', color: '#0f172a', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
            Contactar Soporte
          </button>
        </section>

      </div>
    </div>
  );
}

export default Services;