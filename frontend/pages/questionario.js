import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppContext } from '../context/AppContext';

export default function QuestionarioPage() {
  const { participantData } = useAppContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [respostas, setRespostas] = useState({
    facilidade: '',
    clareza: '',
    feedback: '',
  });

  // Redireciona se os dados da atividade não existirem
  useEffect(() => {
    if (!participantData.decisao) {
      router.push('/');
    }
  }, [participantData.decisao, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRespostas((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...participantData,
      questionario: {
        "Qual foi a facilidade de usar o modelo (1-5)?": respostas.facilidade,
        "O modelo ajudou a clarear a decisão (1-5)?": respostas.clareza,
        "Feedback aberto:": respostas.feedback,
      },
    };

    try {
      const response = await fetch('http://localhost:5001/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar os dados.');
      }

      router.push('/obrigado');

    } catch (error) {
      console.error(error);
      alert('Houve um erro ao enviar suas respostas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h1>Questionário Final</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Em uma escala de 1 (muito difícil) a 5 (muito fácil), como você avalia a facilidade de usar o modelo apresentado?</label>
          <input type="number" name="facilidade" min="1" max="5" value={respostas.facilidade} onChange={handleChange} required />
        </div>
        <div>
          <label>Em uma escala de 1 (não ajudou) a 5 (ajudou muito), o quanto o modelo ajudou a estruturar e clarear seu pensamento sobre a decisão?</label>
          <input type="number" name="clareza" min="1" max="5" value={respostas.clareza} onChange={handleChange} required />
        </div>
        <div>
          <label>Você tem algum feedback ou sugestão sobre o modelo que utilizou?</label>
          <textarea name="feedback" value={respostas.feedback} onChange={handleChange} />
        </div>
        <button type="submit" disabled={loading || !respostas.facilidade || !respostas.clareza}>
          {loading ? 'Enviando...' : 'Enviar Respostas Finais'}
        </button>
      </form>
    </main>
  );
}