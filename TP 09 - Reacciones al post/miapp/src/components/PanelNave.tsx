import React, { useState } from 'react';
import nave from '../assets/nave.jpeg';
import './PanelNave.css';

function PanelNave() {
  const [energia, setEnergia] = useState(100);
  const [mensaje, setMensaje] = useState('');
  const [comentarios, setComentarios] = useState<string[]>([]);
  const [error, setError] = useState('');

  // Reacciones
  const [likes, setLikes] = useState(0);
  const [divierte, setDivierte] = useState(0);
  const [sorprende, setSorprende] = useState(0);

  const gastarEnergia = () => {
    if (energia > 0) {
      setEnergia(energia - 10);
    }
  };

  const recargarEnergia = () => {
    if (energia < 100) {
      setEnergia(energia + 10);
    }
  };

  const manejarComentario = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (mensaje.trim() === '') {
      setError('⚠️ El comentario no puede estar vacío.');
      return;
    }
    if (mensaje.length > 40) {
      setError('⚠️ El comentario debe tener menos de 40 caracteres.');
      return;
    }

    setComentarios([...comentarios, mensaje]);
    setMensaje('');
    setError('');
  };

  return (
    <div style={{ textAlign: 'center', fontFamily: 'sans-serif' }}>
      {/* Imagen del OVNI con animación */}
      <img src={nave} alt="Nave espacial" className="ovni" />

      {/* Texto del post */}
      <h1>🚀 Panel de Energía</h1>
      <p>¡Mi primer post en Reactbook!</p>

      {/* Botones de energía */}
      <h2>🔋 Energía: {energia}</h2>
      <button onClick={gastarEnergia}>🛸 Usar Nave</button>
      <button onClick={recargarEnergia}>🔌 Recargar</button>

      {/* Botones de reacciones */}
      <div style={{ margin: '10px 0' }}>
        <button onClick={() => setLikes(likes + 1)}>❤️ {likes}</button>
        <button onClick={() => setDivierte(divierte + 1)} style={{ margin: '0 10px' }}>
          😂 {divierte}
        </button>
        <button onClick={() => setSorprende(sorprende + 1)}>😮 {sorprende}</button>
      </div>

      {/* Formulario de comentarios */}
      <h3>💬 Comentario:</h3>
      <form onSubmit={manejarComentario}>
        <input
          type="text"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escribe tu comentario (menos de 40 caracteres)"
        />
        <button type="submit" style={{ marginLeft: '10px' }}>Comentar</button>
      </form>

      {/* Error */}
      {error && <p style={{ color: 'red', fontSize: '0.9em' }}>{error}</p>}

      {/* Lista de comentarios */}
      {comentarios.map((comentario, index) => (
        <p key={index}>Comentario {index + 1}: {comentario}</p>
      ))}
    </div>
  );
}

export default PanelNave;
