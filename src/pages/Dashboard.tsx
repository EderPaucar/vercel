function Dashboard() {
  return (
    <section className="page">
      <h2>Panel Principal - SENATI</h2>
      
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        {/* Menú lateral como en la pizarra */}
        <div style={{ borderRight: '1px solid #ccc', paddingRight: '20px' }}>
          <p><strong>• Datos</strong></p>
          <p><strong>• Procesos</strong></p>
          <p><strong>• Reportes</strong></p>
        </div>

        {/* Zona de importación de CSV */}
        <div>
          <h3>Importar Archivos</h3>
          <input type="file" accept=".csv" />
          <button style={{ marginLeft: '10px' }}>Cargar CSV</button>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;