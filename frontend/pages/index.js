import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAppContext } from '../context/AppContext';

export default function HomePage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const { setParticipantData } = useAppContext();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting form with:', { nome, email });
    setParticipantData((prev) => ({ ...prev, nome, email }));
    console.log('Navigating to /documentacao');
    router.push('/documentacao');
  };

  return (
    <main style={{
      maxWidth: '800px',
      margin: '2rem auto',
      padding: '2rem',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif'
    }}>
      <h1 style={{
        color: '#1a202c',
        borderBottom: '2px solid #e2e8f0',
        paddingBottom: '0.5rem',
        marginBottom: '1.5rem'
      }}>Identificação do Participante</h1>
      <p>Por favor, forneça seu nome e e-mail para iniciar a atividade.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Nome:</label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '0.8rem',
            marginBottom: '1rem',
            borderRadius: '4px',
            border: '1px solid #cbd5e0',
            fontSize: '1rem',
            boxSizing: 'border-box'
          }}
        />
        <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>E-mail:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '0.8rem',
            marginBottom: '1rem',
            borderRadius: '4px',
            border: '1px solid #cbd5e0',
            fontSize: '1rem',
            boxSizing: 'border-box'
          }}
        />
        <button 
          type="submit" 
          disabled={!nome || !email}
          style={{
            backgroundColor: (!nome || !email) ? '#a0aec0' : '#4299e1',
            color: 'white',
            border: 'none',
            padding: '0.8rem 1.5rem',
            borderRadius: '4px',
            fontSize: '1rem',
            cursor: (!nome || !email) ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          Iniciar Atividade
        </button>
      </form>
    </main>
  );
}