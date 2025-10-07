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
    setParticipantData((prev) => ({ ...prev, nome, email }));
    router.push('/documentacao');
  };

  return (
    <main>
      <h1>Identificação do Participante</h1>
      <p>Por favor, forneça seu nome e e-mail para iniciar a atividade.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={!nome || !email}>
          Iniciar Atividade
        </button>
      </form>
    </main>
  );
}