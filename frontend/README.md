## Experimento ADR - Frontend

Aplicação Next.js para coleta de ADRs em experimento com alunos, com envio via EmailJS e export estático para GitHub Pages.

## Requisitos

- Node.js 18+ (recomendado 20)
- pnpm (gerenciador de pacotes)

Instale o pnpm, se ainda não tiver:

```bash
npm install -g pnpm
```

## Como rodar em outra máquina (passo a passo)

1. Clonar o repositório
```bash
git clone https://github.com/SEU_USUARIO/evaluate_adr_front.git
cd evaluate_adr_front/frontend
```

2. Instalar dependências
```bash
pnpm install
```

3. Configurar variáveis de ambiente (EmailJS)

Crie um arquivo `.env.local` dentro de `frontend/` com:
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=seu_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=seu_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=sua_public_key
NEXT_PUBLIC_MODELO=Nygard
```

Se você não configurar o EmailJS, o sistema ainda funciona e salva tudo no `localStorage`. O email apenas não será enviado.

4. Rodar em desenvolvimento
```bash
pnpm dev
```

Abra `http://localhost:3000` no navegador.

## Fluxo da aplicação

1. Tela inicial: preencha nome e e-mail e clique em "Iniciar Atividade".
2. Tela de documentação: escreva a ADR.
   - O tempo é contado internamente (cronômetro oculto).
   - O botão "Consultar Material de Apoio" abre o material (contador invisível para o usuário).
3. Ao finalizar:
   - Os dados são enviados por EmailJS (se configurado).
   - Backup salvo no `localStorage` com os campos: `iniciadoEm`, `finalizadoEm`, `tempo` (segundos), `consultas`, `decisao`, `nome`, `email`, `modelo`.
4. Tela de obrigado: possui link clicável para o formulário.

## Campos salvos

```json
{
  "timestamp": "2025-10-07T16:41:18.599Z",
  "nome": "Participante",
  "email": "participante@exemplo.com",
  "modelo": "Nygard",
  "tempo": 123,
  "consultas": 2,
  "decisao": "Conteúdo da ADR...",
  "iniciadoEm": "2025-10-07T16:38:12.123Z",
  "finalizadoEm": "2025-10-07T16:40:15.456Z"
}
```

## Build e export estático (GitHub Pages)

O projeto já está configurado para export estático com `next export`.

Para build local:
```bash
pnpm build
```

Os arquivos gerados ficam em `frontend/out/`.

## Distribuir em várias máquinas (sem instalar pnpm/Node)

Você pode pré-compilar uma vez e distribuir apenas os arquivos estáticos.

1) Na sua máquina de desenvolvimento (com pnpm/Node):
```bash
cd frontend
pnpm install
pnpm build
```

2) Copie para as máquinas de destino os diretórios/arquivos:
- `frontend/out/` (gerado pelo build)
- `scripts/run_local.sh`

3) Na máquina de destino (Linux Mint), rode o servidor local (requer Python):
```bash
bash scripts/run_local.sh
# por padrão em http://localhost:3000/evaluate_adr_front/
```

Observações:
- É necessário ter Python instalado (a maioria das distros já possui). O script tenta `python3` e cai para `python` (legacy) se necessário.
- Como o projeto está configurado com `basePath` para `/evaluate_adr_front`, acesse a URL completa: `http://localhost:3000/evaluate_adr_front/`.
- O envio de email via EmailJS funciona normalmente, pois roda no cliente. Se não configurar o EmailJS, os dados são salvos no `localStorage` como fallback.

### Deploy automático (GitHub Actions)

O workflow `.github/workflows/deploy.yml` realiza:
- Instalação com pnpm
- Build com variáveis de ambiente do EmailJS
- Publicação no GitHub Pages

Em produção, o `basePath` e `assetPrefix` estão configurados para `/evaluate_adr_front`, necessário para GitHub Pages.

### Ajustes se você forkou o repositório

Se o nome do seu repositório for outro, edite `frontend/next.config.ts`:

```ts
basePath: process.env.NODE_ENV === 'production' ? '/SEU_REPO' : '',
assetPrefix: process.env.NODE_ENV === 'production' ? '/SEU_REPO/' : '',
```

## Dicas de troubleshooting

- CSS não carregando no GitHub Pages: verifique `basePath` e `assetPrefix`.
- Botão "Iniciar Atividade" não clica: verifique se nome e e-mail estão preenchidos.
- Email não enviado: confira variáveis do EmailJS ou use apenas o `localStorage`.
- Conflitos de rotas: este projeto usa somente `pages/` (Pages Router).

## Licença

Uso acadêmico.
