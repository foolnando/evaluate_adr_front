import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppContext } from '../context/AppContext';
// import Cronometro from '../components/Cronometro';
import MaterialApoioModal from '../components/MaterialApoioModal';
import emailjs from '@emailjs/browser';

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
    const finishedAtMs = Date.now();
    const tempoFinal = Math.round((finishedAtMs - startTime) / 1000);
    const startedAtISO = startTime ? new Date(startTime).toISOString() : null;
    const finishedAtISO = new Date(finishedAtMs).toISOString();
    
    // Atualizar dados do participante
    setParticipantData((prev) => ({
      ...prev,
      tempo: tempoFinal,
      consultas: consultas,
      decisao: decisao,
      iniciadoEm: startedAtISO,
      finalizadoEm: finishedAtISO,
    }));

    // Salvar dados localmente (fallback)
    try {
      const experimentData = {
        timestamp: new Date().toISOString(),
        nome: participantData.nome,
        email: participantData.email,
        modelo: participantData.modelo,
        tempo: tempoFinal,
        consultas: consultas,
        decisao: decisao,
        iniciadoEm: startedAtISO,
        finalizadoEm: finishedAtISO,
      };

      // Salvar no localStorage como fallback
      const savedData = JSON.parse(localStorage.getItem('adr-experiments') || '[]');
      savedData.push(experimentData);
      localStorage.setItem('adr-experiments', JSON.stringify(savedData));
      
      console.log('Dados salvos localmente no localStorage');
    } catch (error) {
      console.error('Erro ao salvar dados localmente:', error);
    }

    // Enviar email via EmailJS
    try {
      const templateParams = {
        to_email: 'fernando.neves@icomp.ufam.edu.br',
        from_name: participantData.nome,
        from_email: participantData.email,
        subject: `experimento adr ${participantData.nome}`,
        nome: participantData.nome,
        email: participantData.email,
        modelo: participantData.modelo,
        tempo: tempoFinal,
        consultas: consultas,
        decisao: decisao,
        iniciadoEm: startedAtISO,
        finalizadoEm: finishedAtISO,
      };

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      console.log('Email enviado com sucesso via EmailJS');
      
    } catch (error) {
      console.error('Erro ao enviar email via EmailJS:', error);
      // Mesmo com erro, continuar para a tela de obrigado
    }

    // Ir para o questionário
    router.push('/questionario');
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
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '1rem' }}>
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