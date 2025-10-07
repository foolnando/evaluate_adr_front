export default function ObrigadoPage() {
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
      <p>Seus dados foram enviados com sucesso.</p>
      <p>Sua contribuição é muito importante para esta avaliação.</p>
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