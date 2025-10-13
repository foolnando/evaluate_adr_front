import { useEffect, useState } from 'react';

export default function ObrigadoPage() {
  const [experimentData, setExperimentData] = useState(null);

  useEffect(() => {
    // Buscar dados do localStorage
    const savedData = JSON.parse(localStorage.getItem('adr-experiments') || '[]');
    if (savedData.length > 0) {
      setExperimentData(savedData[savedData.length - 1]); // Pegar o último experimento
    }
  }, []);

  const downloadData = () => {
    if (!experimentData) return;
    
    const dataStr = JSON.stringify(experimentData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `adr-experiment-${experimentData.nome}-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
      }}>Obrigado por sua participação!</h1>
      <p>Seus dados foram salvos com sucesso.</p>
      <p>Sua contribuição é muito importante para esta avaliação.</p>
      
      {experimentData && (
        <div style={{
          backgroundColor: '#f7fafc',
          padding: '1rem',
          borderRadius: '4px',
          marginBottom: '1rem',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ marginTop: 0, color: '#2d3748' }}>Seus dados do experimento:</h3>
          <p><strong>Nome:</strong> {experimentData.nome}</p>
          <p><strong>Modelo:</strong> {experimentData.modelo}</p>
          <p><strong>Tempo:</strong> {experimentData.tempo} segundos</p>
          <p><strong>Consultas ao material:</strong> {experimentData.consultas}</p>
          <button 
            onClick={downloadData}
            style={{
              backgroundColor: '#4299e1',
              color: 'white',
              border: 'none',
              padding: '0.8rem 1.5rem',
              borderRadius: '4px',
              fontSize: '1rem',
              cursor: 'pointer',
              marginTop: '0.5rem'
            }}
          >
            📥 Baixar Dados do Experimento
          </button>
        </div>
      )}
      
      <p>
        Agora, por favor responda o questionário disponível em:{' '}
        <a 
          href="https://forms.gle/f4NaYKXasyvbanmR8"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#4299e1',
            textDecoration: 'underline',
            fontWeight: 'bold'
          }}
        >
          https://forms.gle/f4NaYKXasyvbanmR8
        </a>
      </p>
    </main>
  );
}