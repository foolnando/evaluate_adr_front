#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
FRONTEND_DIR="$ROOT_DIR/frontend"

have() { command -v "$1" >/dev/null 2>&1; }

ensure_pnpm() {
  if have pnpm; then
    return 0
  fi

  echo "[INFO] pnpm não encontrado. Tentando instalar..."

  if have npm; then
    echo "[INFO] Instalando pnpm via npm (pode pedir sudo)..."
    if have sudo; then
      if sudo npm install -g pnpm; then
        :
      else
        echo "[WARN] Falhou com sudo. Tentando sem sudo (instalação no usuário)."
        npm install -g pnpm || true
      fi
    else
      npm install -g pnpm || true
    fi
  fi

  # Instalação via script oficial (caso ainda não exista)
  if ! have pnpm; then
    if have curl; then
      echo "[INFO] Instalando pnpm via script oficial (curl)."
      curl -fsSL https://get.pnpm.io/install.sh | sh -
    elif have wget; then
      echo "[INFO] Instalando pnpm via script oficial (wget)."
      wget -qO- https://get.pnpm.io/install.sh | sh -
    fi
  fi

  # Tentar adicionar diretório padrão do pnpm ao PATH na sessão atual
  if ! have pnpm; then
    for p in "$HOME/.local/share/pnpm" "$HOME/Library/pnpm"; do
      if [ -d "$p" ]; then
        export PATH="$p:$PATH"
      fi
    done
  fi

  if ! have pnpm; then
    echo "[ERRO] pnpm não pôde ser instalado automaticamente. Instale manualmente e tente novamente."
    exit 1
  fi

  echo "[OK] pnpm disponível: $(pnpm -v)"
}

run_mode="dev" # dev | prod
if [ "${1:-}" = "prod" ] || [ "${1:-}" = "production" ]; then
  run_mode="prod"
fi

ensure_pnpm

cd "$FRONTEND_DIR"

echo "[INFO] Instalando dependências (pnpm install)"
pnpm install

if [ "$run_mode" = "prod" ]; then
  echo "[INFO] Executando build e start de produção"
  pnpm build
  pnpm start
else
  echo "[INFO] Executando ambiente de desenvolvimento (pnpm dev)"
  pnpm dev
fi


