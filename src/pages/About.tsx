import { useNavigate } from 'react-router';

function About() {
  const navigate = useNavigate();

  const valores = [
    {
      titulo: 'Innovación Continua',
      desc: 'Evolucionamos nuestras herramientas con tecnologías modernas como React, Node.js y arquitecturas Cloud.'
    },
    {
      titulo: 'Seguridad Integral',
      desc: 'Protegemos la información sensible del personal mediante autenticación segura y protocolos cifrados.'
    },
    {
      titulo: 'Eficiencia Operativa',
      desc: 'Optimizamos procesos complejos para reducir el tiempo de gestión de recursos humanos al mínimo.'
    },
    {
      titulo: 'Transparencia de Datos',
      desc: 'Garantizamos registros precisos e inalterables para auditorías y toma de decisiones.'
    }
  ];

  return (
    <div style={{ backgroundColor: '#0b0f19', minHeight: '100vh', color: '#f8fafc', fontFamily: 'sans-serif', padding: '60px 40px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ color: '#38bdf8', fontSize: '13px', fontWeight: 'bold', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            ACERCA DE CMR SYSTEM
          </span>
          <h1 style={{ fontSize: '38px', fontWeight: 'bold', marginTop: '12px', color: '#ffffff' }}>
            Transformando la Gestión Empresarial
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '16px', maxWidth: '700px', margin: '15px auto 0', lineHeight: '1.6' }}>
            Somos una solución tecnológica orientada a simplificar la administración de personal, el control de asistencias y la automatización de procesos operativos.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '60px' }}>
          <div style={{ backgroundColor: '#111827', padding: '30px', borderRadius: '12px', border: '1px solid #1f2937', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#38bdf8' }}>+100%</div>
            <div style={{ fontSize: '14px', color: '#9ca3af', marginTop: '5px' }}>Digitalización de Procesos</div>
          </div>
          <div style={{ backgroundColor: '#111827', padding: '30px', borderRadius: '12px', border: '1px solid #1f2937', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#38bdf8' }}>24 / 7</div>
            <div style={{ fontSize: '14px', color: '#9ca3af', marginTop: '5px' }}>Acceso y Disponibilidad Cloud</div>
          </div>
          <div style={{ backgroundColor: '#111827', padding: '30px', borderRadius: '12px', border: '1px solid #1f2937', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#38bdf8' }}>0%</div>
            <div style={{ fontSize: '14px', color: '#9ca3af', marginTop: '5px' }}>Margen de Error en Registros</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '60px' }}>
          <div style={{ backgroundColor: '#1e293b', padding: '35px', borderRadius: '16px', border: '1px solid #334155' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#38bdf8', marginBottom: '12px' }}>Nuestra Misión</h3>
            <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: '1.6' }}>
              Proporcionar a las empresas una plataforma robusta e intuitiva que permita gestionar accesos, asistencias y métricas en tiempo real, eliminando cargas administrativas innecesarias.
            </p>
          </div>

          <div style={{ backgroundColor: '#1e293b', padding: '35px', borderRadius: '16px', border: '1px solid #334155' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#38bdf8', marginBottom: '12px' }}>Nuestra Visión</h3>
            <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: '1.6' }}>
              Consolidarnos como la herramienta estándar en el control operativo y la analítica de gestión humana, ofreciendo soluciones escalables para organizaciones de cualquier sector.
            </p>
          </div>
        </div>

        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffffff', marginBottom: '30px', textAlign: 'center' }}>
          Nuestros Valores
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '60px' }}>
          {valores.map((item, index) => (
            <div key={index} style={{ backgroundColor: '#111827', padding: '25px', borderRadius: '12px', border: '1px solid #1f2937' }}>
              <h4 style={{ fontSize: '17px', fontWeight: 'bold', color: '#f3f4f6', marginBottom: '8px' }}>{item.titulo}</h4>
              <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: '1.5', margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button onClick={() => navigate('/contact')} style={{ backgroundColor: '#0284c7', color: '#ffffff', border: 'none', padding: '14px 28px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
            Conoce Más Sobre el Proyecto
          </button>
        </div>

      </div>
    </div>
  );
}

export default About;