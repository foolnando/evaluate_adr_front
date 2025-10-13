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
    
    <h4>Exemplo Prático:</h4>
    <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px', marginTop: '10px', fontFamily: 'monospace', fontSize: '12px' }}>
      <strong># ADR-001: Implementação de Cache Redis para Melhorar Performance</strong><br/><br/>
      <strong>Status:</strong> Aceita | <strong>Decisores:</strong> Equipe de Arquitetura | <strong>Data:</strong> 2024-01-15<br/><br/>
      <strong>## Contexto e Declaração do Problema</strong><br/>
      Nossa aplicação web está enfrentando lentidão significativa nas consultas ao banco de dados, especialmente em operações de leitura frequentes. Como podemos melhorar a performance sem comprometer a consistência dos dados?<br/><br/>
      <strong>## Direcionadores da Decisão</strong><br/>
      - Performance: Reduzir tempo de resposta das consultas<br/>
      - Escalabilidade: Suportar maior volume de usuários<br/>
      - Custo: Minimizar custos de infraestrutura<br/><br/>
      <strong>## Opções Consideradas</strong><br/>
      1. Implementar cache em memória (Redis)<br/>
      2. Otimizar consultas SQL<br/>
      3. Implementar cache no nível da aplicação<br/><br/>
      <strong>## Resultado da Decisão</strong><br/>
      Escolhemos implementar Redis como cache em memória. Esta opção oferece melhor performance, é facilmente escalável e tem boa integração com nossa stack tecnológica.<br/><br/>
      <strong>## Prós e Contras das Opções</strong><br/>
      <strong>Redis:</strong><br/>
      ✅ Prós: Alta performance, escalabilidade, persistência opcional<br/>
      ❌ Contras: Complexidade adicional, custo de infraestrutura<br/><br/>
      <strong>Otimização SQL:</strong><br/>
      ✅ Prós: Sem custos adicionais, solução nativa<br/>
      ❌ Contras: Melhoria limitada, complexidade de manutenção
    </div>
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
      
      <h4>Exemplo Prático:</h4>
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px', marginTop: '10px', fontFamily: 'monospace', fontSize: '12px' }}>
        <strong>ADR-001: Implementação de Cache Redis para Melhorar Performance</strong><br/><br/>
        <strong>Status:</strong> Aceita<br/><br/>
        <strong>Contexto:</strong><br/>
        Nossa aplicação web está enfrentando lentidão significativa nas consultas ao banco de dados, especialmente em operações de leitura frequentes. O tempo de resposta atual está impactando negativamente a experiência do usuário e limitando nossa capacidade de escalar.<br/><br/>
        <strong>Decisão:</strong><br/>
        Implementaremos Redis como solução de cache em memória para otimizar as consultas mais frequentes ao banco de dados. O Redis será configurado para armazenar dados de leitura frequente com TTL (Time To Live) apropriado para cada tipo de dado.<br/><br/>
        <strong>Consequências:</strong><br/>
        <strong>Positivas:</strong><br/>
        - Redução significativa no tempo de resposta das consultas<br/>
        - Melhoria na experiência do usuário<br/>
        - Maior capacidade de escalar horizontalmente<br/>
        - Redução da carga no banco de dados principal<br/><br/>
        <strong>Negativas:</strong><br/>
        - Complexidade adicional na arquitetura<br/>
        - Custo adicional de infraestrutura para o Redis<br/>
        - Necessidade de gerenciar consistência entre cache e banco<br/>
        - Curva de aprendizado para a equipe
      </div>
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