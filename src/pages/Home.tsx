import { useNavigate } from 'react-router';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: 'sans-serif' }}>
      <aside style={{ width: '260px', backgroundColor: '#0f172a', color: '#ffffff', padding: '40px 30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#38bdf8', marginBottom: '50px' }}>
            CMR System
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <a href="#" style={{ textDecoration: 'none', color: '#38bdf8', fontWeight: '600' }}>• Inicio</a>
            <a href="#" style={{ textDecoration: 'none', color: '#94a3b8' }}>• Nosotros</a>
            <a href="#" style={{ textDecoration: 'none', color: '#94a3b8' }}>• Servicios</a>
            <a href="#" style={{ textDecoration: 'none', color: '#94a3b8' }}>• Contacto</a>
          </nav>
        </div>
        <button onClick={() => navigate('/login')} style={{ backgroundColor: '#0284c7', color: '#ffffff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', width: '100%' }}>
          Iniciar Sesión
        </button>
      </aside>

      <main style={{ flex: 1, padding: '50px 60px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
        <section style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '50px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px' }}>
          <div style={{ flex: 1 }}>
            <span style={{ backgroundColor: '#e0f2fe', color: '#0284c7', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
              GESTIÓN OPERATIVA
            </span>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#0f172a', marginTop: '15px', marginBottom: '15px', lineHeight: '1.2' }}>
              Control Inteligente y Monitoreo en Tiempo Real
            </h1>
            <p style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.6', marginBottom: '25px' }}>
              Centraliza la asistencia, optimiza flujos de trabajo y toma decisiones respaldadas por análisis precisos desde un solo panel.
            </p>
            <button onClick={() => navigate('/login')} style={{ backgroundColor: '#0f172a', color: '#ffffff', border: 'none', padding: '14px 28px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
              Acceder Ahora
            </button>
          </div>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '25px' }}>
          <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '14px', borderLeft: '5px solid #0284c7', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}>Monitoreo Activo</h3>
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>
              Supervisión de registros y eventos del sistema al instante.
            </p>
          </div>

          <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '14px', borderLeft: '5px solid #0f172a', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}>Reportes Automatizados</h3>
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>
              Exportación rápida de métricas clave sin procesos manuales.
            </p>
          </div>

          <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '14px', borderLeft: '5px solid #0f172a', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}>Control de Accesos</h3>
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>
              Validación segura de identidades y credenciales de usuario.
            </p>
          </div>

          <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '14px', borderLeft: '5px solid #0284c7', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}>Infraestructura Cloud</h3>
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>
              Disponibilidad total de la información de manera centralizada.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;