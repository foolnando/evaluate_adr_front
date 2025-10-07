# Deploy no GitHub Pages

## ⚠️ Importante: Limitação do GitHub Pages

O GitHub Pages é um serviço de hospedagem **estática**, ou seja, não suporta:
- APIs server-side (como nossa `/api/send-email`)
- Banco de dados
- Processamento no servidor

## Soluções para o Envio de Email

### Opção 1: EmailJS (Recomendado)
- Serviço gratuito que permite enviar emails do frontend
- Funciona perfeitamente com GitHub Pages
- Limite: 200 emails/mês gratuitos

### Opção 2: Apenas Salvamento Local
- Remover completamente o envio de email
- Manter apenas o salvamento local dos dados
- Mais simples, mas você precisará coletar os arquivos manualmente

### Opção 3: Usar Vercel/Netlify
- Hospedagem que suporta APIs server-side
- Deploy gratuito
- Mantém toda funcionalidade atual

## Como Fazer o Deploy

### 1. Configurar o Repositório

```bash
# No seu repositório GitHub, vá em Settings > Pages
# Source: GitHub Actions
```

### 2. Fazer Push do Código

```bash
git add .
git commit -m "Configure for GitHub Pages"
git push origin main
```

### 3. O GitHub Actions fará o deploy automaticamente

O workflow criado irá:
- Instalar dependências
- Fazer build do projeto
- Deployar para GitHub Pages

## Arquivos Criados

- `.github/workflows/deploy.yml` - Workflow de deploy
- `next.config.ts` - Configurado para export estático
- `DEPLOY_GITHUB_PAGES.md` - Esta documentação

## Próximos Passos

1. **Escolher uma das opções de email** acima
2. **Fazer push para o GitHub**
3. **Configurar GitHub Pages** nas configurações do repo
4. **Testar o deploy**

Qual opção você prefere para o envio de email?
