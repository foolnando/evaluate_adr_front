# Configuração do EmailJS para GitHub Pages

## ✅ EmailJS Implementado!

O projeto agora usa EmailJS para envio de emails, que funciona perfeitamente no GitHub Pages.

## 🔧 Como Configurar

### 1. Criar Conta no EmailJS

1. Acesse [https://www.emailjs.com/](https://www.emailjs.com/)
2. Clique em "Sign Up" e crie uma conta gratuita
3. Confirme seu email

### 2. Configurar Serviço de Email

1. No dashboard, vá em **"Email Services"**
2. Clique em **"Add New Service"**
3. Escolha seu provedor (Gmail, Outlook, etc.)
4. Siga as instruções para conectar sua conta
5. **Anote o Service ID** (ex: `service_abc123`)

### 3. Criar Template de Email

1. Vá em **"Email Templates"**
2. Clique em **"Create New Template"**
3. Use este template:

```
Assunto: {{subject}}

Dados do Experimento ADR:

Nome do participante: {{nome}}
Email do participante: {{email}}
Modelo utilizado: {{modelo}}
Tempo de preenchimento: {{tempo}} segundos
Número de consultas ao material: {{consultas}}

ADR produzida:
{{decisao}}

---
Enviado automaticamente pelo sistema de experimento ADR
```

4. **Anote o Template ID** (ex: `template_xyz789`)

### 4. Obter Public Key

1. Vá em **"Account"** > **"General"**
2. **Anote a Public Key** (ex: `user_abc123def456`)

### 5. Configurar Variáveis de Ambiente

Crie o arquivo `.env.local` na pasta `frontend/`:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=user_abc123def456
NEXT_PUBLIC_MODELO=Nygard
```

### 6. Para GitHub Pages

No GitHub, vá em **Settings** > **Secrets and variables** > **Actions** e adicione:

- `EMAILJS_SERVICE_ID`: seu_service_id
- `EMAILJS_TEMPLATE_ID`: seu_template_id  
- `EMAILJS_PUBLIC_KEY`: sua_public_key

## 🚀 Funcionalidades

### ✅ O que funciona:
- **Envio de email** via EmailJS
- **Salvamento local** no localStorage (fallback)
- **Deploy no GitHub Pages**
- **Contador de consultas** (invisível)
- **Campo de ADR aumentado**

### 📧 Dados enviados por email:
- Nome do participante
- Email do participante  
- Modelo utilizado (MADR ou Nygard)
- Tempo de preenchimento
- Número de consultas ao material
- ADR completa produzida

### 💾 Fallback local:
- Dados salvos no localStorage do navegador
- Acessível via console do navegador
- Array com todos os experimentos

## 🆓 Limites Gratuitos

- **200 emails/mês** gratuitos
- **2 templates** gratuitos
- **1 serviço de email** gratuito

## 🧪 Testar

1. Configure as variáveis de ambiente
2. Execute: `pnpm dev`
3. Complete um experimento
4. Verifique se o email foi enviado
5. Verifique o localStorage no console

## 📝 Notas Importantes

- Os dados são **sempre salvos localmente** como backup
- Se o EmailJS falhar, o experimento continua normalmente
- O email é enviado para: `fernando.neves@icomp.ufam.edu.br`
- Assunto: `experimento adr {nome do participante}`
