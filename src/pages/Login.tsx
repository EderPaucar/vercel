import { useState } from 'react';
import { useNavigate } from 'react-router';

function Login() {
  const [mode, setMode] = useState<'login' | 'register' | 'otp'>('login');
  const [formData, setFormData] = useState({ name: '', lastname: '', email: '', password: '', otp: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://127.0.0.1:4000/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });

      if (res.ok) {
        setMode('otp');
      } else {
        alert('Error al generar el código');
      }
    } catch (error) {
      alert('Error de conexión con el servidor backend');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('http://127.0.0.1:4000/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp: formData.otp }),
      });

      if (res.ok) {
        navigate('/dashboard');
      } else {
        alert('Código incorrecto');
      }
    } catch (error) {
      alert('Error de conexión con el servidor');
    }
  };

  return (
    <div style={{ backgroundColor: '#0b0f19', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '440px', backgroundColor: '#111827', borderRadius: '16px', border: '1px solid #1f2937', padding: '40px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#38bdf8', letterSpacing: '1px', marginBottom: '8px' }}>
            CMR SYSTEM
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#f3f4f6', margin: 0 }}>
            {mode === 'login' && 'Iniciar Sesión'}
            {mode === 'register' && 'Crear Cuenta'}
            {mode === 'otp' && 'Verificación de Seguridad'}
          </h2>
        </div>

        {mode === 'login' && (
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '6px' }}>Correo Electrónico</label>
              <input type="email" name="email" placeholder="usuario@empresa.com" onChange={handleChange} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #374151', backgroundColor: '#1f2937', color: '#ffffff', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} />
            </div>
            
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '6px' }}>Contraseña</label>
              <input type="password" name="password" placeholder="••••••••" onChange={handleChange} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #374151', backgroundColor: '#1f2937', color: '#ffffff', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} />
            </div>

            <button type="submit" style={{ width: '100%', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '600', fontSize: '14px', cursor: 'pointer', transition: '0.2s' }}>
              Ingresar al Plataforma
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', fontSize: '13px' }}>
              <a href="#" onClick={(e) => { e.preventDefault(); setMode('register'); }} style={{ color: '#38bdf8', textDecoration: 'none' }}>Crear cuenta</a>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Instrucciones enviadas'); }} style={{ color: '#9ca3af', textDecoration: 'none' }}>¿Olvidaste tu contraseña?</a>
            </div>
          </form>
        )}

        {mode === 'register' && (
          <form onSubmit={handleRegister}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '6px' }}>Nombre</label>
                <input type="text" name="name" placeholder="Tu nombre" onChange={handleChange} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #374151', backgroundColor: '#1f2937', color: '#ffffff', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '6px' }}>Apellido</label>
                <input type="text" name="lastname" placeholder="Tu apellido" onChange={handleChange} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #374151', backgroundColor: '#1f2937', color: '#ffffff', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} />
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '6px' }}>Correo Electrónico</label>
              <input type="email" name="email" placeholder="usuario@empresa.com" onChange={handleChange} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #374151', backgroundColor: '#1f2937', color: '#ffffff', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '6px' }}>Contraseña</label>
              <input type="password" name="password" placeholder="••••••••" onChange={handleChange} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #374151', backgroundColor: '#1f2937', color: '#ffffff', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} />
            </div>

            <button type="submit" disabled={loading} style={{ width: '100%', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}>
              {loading ? 'Generando código...' : 'Registrarse y Enviar Código'}
            </button>

            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px' }}>
              <a href="#" onClick={(e) => { e.preventDefault(); setMode('login'); }} style={{ color: '#38bdf8', textDecoration: 'none' }}>¿Ya tienes cuenta? Inicia sesión</a>
            </div>
          </form>
        )}

        {mode === 'otp' && (
          <form onSubmit={handleVerifyOtp}>
            <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '20px', textAlign: 'center' }}>
              Ingresa el código OTP enviado a <br/><strong style={{ color: '#38bdf8' }}>{formData.email}</strong>
            </p>

            <div style={{ marginBottom: '24px' }}>
              <input type="text" name="otp" maxLength={4} placeholder="0000" onChange={handleChange} required style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #0284c7', backgroundColor: '#1f2937', color: '#ffffff', fontSize: '20px', textAlign: 'center', letterSpacing: '8px', fontWeight: 'bold', boxSizing: 'border-box', outline: 'none' }} />
            </div>

            <button type="submit" style={{ width: '100%', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}>
              Confirmar e Ingresar
            </button>
          </form>
        )}

      </div>
    </div>
  );
}

export default Login;