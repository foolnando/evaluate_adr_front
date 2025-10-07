export default function MaterialApoioModal({ modelo, onClose }) {
const materialA = (
  <div>
    <h3>Modelo MADR (Markdown Architectural Decision Records)</h3>
    <p>Este é um modelo detalhado que inclui análise comparativa entre as opções.</p>
    <ul>
      <li>
        <strong>Título:</strong>
        <p>Um título curto para o problema resolvido e a solução aplicada.</p>
      </li>
      <li>
        <strong>Status, Decisores, Data (Opcional):</strong>
        <p>Metadados sobre o estado atual da decisão, quem participou e quando foi atualizada.</p>
      </li>
      <li>
        <strong>Contexto e Declaração do Problema:</strong>
        <p>Descreva o cenário e o problema, de preferência em duas ou três frases. Pode ser articulado como uma pergunta.</p>
      </li>
      <li>
        <strong>Direcionadores da Decisão (Opcional):</strong>
        <p>Liste as forças ou preocupações que guiaram a escolha (ex: performance, custo, segurança).</p>
      </li>
      <li>
        <strong>Opções Consideradas:</strong>
        <p>Liste todas as alternativas que foram avaliadas para resolver o problema.</p>
      </li>
      <li>
        <strong>Resultado da Decisão:</strong>
        <p>Indique a opção escolhida e a principal justificativa para a escolha. Detalhe as consequências positivas e negativas.</p>
      </li>
      <li>
        <strong>Prós e Contras das Opções (Opcional):</strong>
        <p>Para cada alternativa considerada, detalhe os pontos positivos e negativos.</p>
      </li>
    </ul>
  </div>
);

  const materialB = (
    <div>
      <h3>Modelo Nygard: Padrão &quot;ADR&quot; (Architectural Decision Record) Simplificado</h3>
      <p>Este modelo é um registro mais formal e focado no estado.</p>
      <ul>
        <li><strong>Título:</strong> Um título curto para a decisão.</li>
        <li><strong>Status:</strong> Proposta, Aceita, Rejeitada, Obsoleta. (Para esta atividade, use &quot;Aceita&quot;).</li>
        <li><strong>Contexto:</strong> Descreva o cenário e o problema a ser resolvido.</li>
        <li><strong>Decisão:</strong> Descreva de forma clara a decisão técnica tomada.</li>
        <li><strong>Consequências:</strong> Liste as consequências positivas e negativas da decisão para o time, o projeto e a arquitetura.</li>
      </ul>
    </div>
  );

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={{ float: 'right' }}>Fechar</button>
        {modelo === 'MADR' ? materialA : materialB}
      </div>
    </div>
  );
}