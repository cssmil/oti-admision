"use client"

import { useState } from 'react';

export default function Home() {
  const [id, setId] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`/api/search?id=${id}`);
      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
        setResult(null);
      }
    } catch (err) {
      setError('Error al buscar los datos.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className='caja-main'>
      <div className='banner'>
        <h1>ADMISIÓN - PAGOS</h1>
      </div>
      <div className='box-form'>
        <h2>Buscar Datos por DNI:</h2>
        <input 
          type="text" 
          value={id} 
          onChange={(e) => setId(e.target.value)} 
          placeholder="Ingrese DNI" 
          className='input-form'
        />
        <button 
          onClick={handleSearch} 
          className='btn-primary'
        >
          Buscar
        </button>

        {loading && 
          <div>
            <br />
            <p>Cargando...</p>
          </div>
        }

        {error && (
          <div style={{ color: 'red', marginTop: '20px' }}>
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div style={{ width: '100%', marginTop: '20px', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px' }}>
            <h2>Resultado:</h2>
            <p><strong>ID:</strong> {result.ID}</p>
            <p><strong>ID2:</strong> {result.ID2}</p>
            <p><strong>Nombres:</strong> {result.Nombres}</p>
            <p><strong>Apellidos:</strong> {result.Apellidos}</p>
            <p><strong>Fecha:</strong> {result.Fecha}</p>
            <p><strong>Monto:</strong> {result.Monto}</p>
          </div>
        )}
      </div>
    </div>
  );
}