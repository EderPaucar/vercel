import { useState } from 'react';

function Contacto() {
  const [formData, setFormData] = useState({ nombre: '', email: '', asunto: 'Soporte', mensaje: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Mensaje enviado con éxito. Te responderemos a la brevedad.');
    setFormData({ nombre: '', email: '', asunto: 'Soporte', mensaje: '' });
  };

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: '#ffffff', fontFamily: 'sans-serif', padding: '60px 40px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span style={{ backgroundColor: '#1e293b', color: '#38bdf8', border: '1px solid #0284c7', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold' }}>
            ATENCIÓN A CLIENTES
          </span>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginTop: '15px', color: '#f8fafc' }}>
            ¿Necesitas Ayuda o Consultas sobre CMR System?
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '16px', marginTop: '10px' }}>
            Escríbenos para asistencia técnica, integración de módulos o consultas administrativas.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '40px', alignItems: 'start' }}>
          
          <div style={{ backgroundColor: '#1e293b', borderRadius: '16px', padding: '40px', border: '1px solid #334155' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#38bdf8', marginBottom: '25px' }}>
              Canales Directos
            </h3>

            <div style={{ marginBottom: '25px' }}>
              <div style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>
                Centro de Operaciones
              </div>
              <div style={{ fontSize: '15px', color: '#e2e8f0', fontWeight: '500' }}>
                Sede Central, Lima - Perú
              </div>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <div style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>
                Correo Institucional
              </div>
              <div style={{ fontSize: '15px', color: '#38bdf8', fontWeight: '500' }}>
                soporte@cmrsystem-project.pe
              </div>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <div style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>
                Atención Telefónica
              </div>
              <div style={{ fontSize: '15px', color: '#e2e8f0', fontWeight: '500' }}>
                +51 (01) 456-7890
              </div>
            </div>

            <div style={{ borderTop: '1px solid #334155', paddingTop: '20px', marginTop: '10px' }}>
              <div style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>
                Horario de Servicio
              </div>
              <div style={{ fontSize: '14px', color: '#cbd5e1' }}>
                Lunes a Sábado: 7:00 AM - 8:00 PM
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '40px', color: '#0f172a' }}>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#334155' }}>
                Nombre y Apellidos
              </label>
              <input 
                type="text" 
                placeholder="Ingresa tu nombre completo" 
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                required 
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#334155' }}>
                Correo Electrónico
              </label>
              <input 
                type="email" 
                placeholder="usuario@empresa.com" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required 
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#334155' }}>
                Tipo de Consulta
              </label>
              <select 
                value={formData.asunto}
                onChange={(e) => setFormData({ ...formData, asunto: e.target.value })}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', backgroundColor: '#ffffff', boxSizing: 'border-box' }}
              >
                <option value="Soporte">Soporte Técnico</option>
                <option value="Administracion">Consulta Administrativa</option>
                <option value="Implementacion">Nueva Implementación</option>
              </select>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#334155' }}>
                Detalle del Mensaje
              </label>
              <textarea 
                rows={4} 
                placeholder="Describe tu solicitud o requerimiento..." 
                value={formData.mensaje}
                onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                required 
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', resize: 'vertical', boxSizing: 'border-box' }}
              />
            </div>

            <button type="submit" style={{ width: '100%', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}>
              Enviar Solicitud
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default Contacto;