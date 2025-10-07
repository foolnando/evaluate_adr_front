import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppContext } from '../context/AppContext';
import Cronometro from '../components/Cronometro';
import MaterialApoioModal from '../components/MaterialApoioModal';

export default function DocumentacaoPage() {
  const { participantData, setParticipantData } = useAppContext();
  const router = useRouter();

  // Estados locais da página
  const [iniciado, setIniciado] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [consultas, setConsultas] = useState(0);
  const [decisao, setDecisao] = useState('');
  const [modalAberto, setModalAberto] = useState(false);

  // Redireciona se o usuário não se identificou
  useEffect(() => {
    if (!participantData.nome) {
      router.push('/');
    }
  }, [participantData.nome, router]);
  
  // Decide o modelo A/B e salva no contexto uma única vez
  useEffect(() => {
    if (participantData.nome && !participantData.modelo) {
      const modeloEscolhido = process.env.NEXT_PUBLIC_MODELO || 'Nygard';
      setParticipantData((prev) => ({ ...prev, modelo: modeloEscolhido }));
    }
  }, [participantData.nome, participantData.modelo, setParticipantData]);


  const handleIniciar = () => {
    setIniciado(true);
    setStartTime(Date.now());
  };

  const handleConsultarMaterial = () => {
    setConsultas((c) => c + 1);
    setModalAberto(true);
  };

  const handleFinalizar = async () => {
    const tempoFinal = Math.round((Date.now() - startTime) / 1000);
    
    // Atualizar dados do participante
    setParticipantData((prev) => ({
      ...prev,
      tempo: tempoFinal,
      consultas: consultas,
      decisao: decisao,
    }));

    // Enviar dados por email e salvar localmente
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: participantData.nome,
          email: participantData.email,
          modelo: participantData.modelo,
          tempo: tempoFinal,
          consultas: consultas,
          decisao: decisao,
        }),
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar dados');
      }

      const result = await response.json();
      console.log('Dados enviados com sucesso:', result);
      
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      // Mesmo com erro, continuar para a tela de obrigado
    }

    // Ir para a tela de obrigado
    router.push('/obrigado');
  };

  return (
    <main>
      <h1>Atividade de Documentação (Modelo {participantData.modelo})</h1>
      {!iniciado ? (
        <div>
          <p>Quando estiver pronto, clique no botão abaixo para iniciar a contagem de tempo e a documentação.</p>
          <button onClick={handleIniciar}>Iniciar Atividade</button>
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <Cronometro startTime={startTime} isRunning={true} />
            <button onClick={handleConsultarMaterial} className="button-secondary">
              Consultar Material de Apoio
            </button>
          </div>
          <textarea
            value={decisao}
            onChange={(e) => setDecisao(e.target.value)}
            placeholder="Documente a decisão arquitetural aqui..."
            style={{
              width: '100%',
              height: '400px',
              minHeight: '400px',
              padding: '12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
              fontFamily: 'monospace',
              resize: 'vertical'
            }}
          />
          <button onClick={handleFinalizar} disabled={!decisao}>
            Finalizar Atividade
          </button>
        </div>
      )}

      {modalAberto && (
        <MaterialApoioModal
          modelo={participantData.modelo}
          onClose={() => setModalAberto(false)}
        />
      )}
    </main>
  );
}