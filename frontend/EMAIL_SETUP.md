# Configuração de Email para o Experimento ADR

## Funcionalidades Implementadas

✅ **Campo de escrita das ADRs aumentado** - Agora com 400px de altura e fonte monospace
✅ **Contador de consultas ao material** - Conta automaticamente sem mostrar ao usuário
✅ **Envio de email automático** - Envia dados para fernando.neves@icomp.ufam.edu.br
✅ **Salvamento local como fallback** - Salva dados em arquivos JSON localmente

## Como Configurar o Envio de Email

### 1. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto frontend com as seguintes variáveis:

```env
# Configurações de Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-de-app

# Modelo padrão para o experimento
NEXT_PUBLIC_MODELO=Nygard
```

### 2. Configurar Gmail (Exemplo)

Para usar Gmail, você precisará:

1. Ativar a verificação em duas etapas na sua conta Google
2. Gerar uma "Senha de app" específica para esta aplicação
3. Usar essa senha de app no campo `SMTP_PASS`

### 3. Outros Provedores de Email

Você pode usar qualquer provedor SMTP. Ajuste as configurações conforme necessário:

- **Outlook/Hotmail**: `smtp-mail.outlook.com`, porta 587
- **Yahoo**: `smtp.mail.yahoo.com`, porta 587
- **Servidor corporativo**: Configure conforme suas políticas

## Funcionamento

### Sem Configuração de Email
- Os dados são salvos apenas localmente na pasta `experiment-data/`
- Cada arquivo contém todos os dados do experimento
- Nenhum email é enviado

### Com Configuração de Email
- Os dados são salvos localmente (backup)
- Um email é enviado automaticamente para `fernando.neves@icomp.ufam.edu.br`
- O assunto do email é: `experimento adr {nome do participante}`
- O email contém todos os dados: nome, email, modelo, tempo, consultas e ADR

## Estrutura dos Dados Salvos

Cada arquivo JSON contém:

```json
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "nome": "Nome do Participante",
  "email": "email@exemplo.com",
  "modelo": "Nygard",
  "tempo": 1200,
  "consultas": 3,
  "decisao": "Conteúdo da ADR...",
  "emailData": {
    "to": "fernando.neves@icomp.ufam.edu.br",
    "from": "email@exemplo.com",
    "subject": "experimento adr Nome do Participante",
    "text": "...",
    "html": "..."
  }
}
```

## Executar o Projeto

```bash
# Instalar dependências
pnpm install

# Executar em desenvolvimento
pnpm dev

# Build para produção
pnpm build
pnpm start
```

## Notas Importantes

- Os dados são sempre salvos localmente, independente do envio de email
- Se o envio de email falhar, o experimento continua normalmente
- Os arquivos de dados são ignorados pelo git (não são versionados)
- O contador de consultas é interno e não é mostrado ao usuário
