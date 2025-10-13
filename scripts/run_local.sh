#!/usr/bin/env bash

set -e

# Serve the prebuilt static site in frontend/out using Python's built-in server

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
OUT_DIR="$ROOT_DIR/frontend/out"

if [ ! -d "$OUT_DIR" ]; then
  echo "[ERRO] Diretório '$OUT_DIR' não encontrado."
  echo "Você precisa gerar os arquivos estáticos antes (build) na sua máquina de desenvolvimento:"
  echo "  cd frontend && pnpm install && pnpm build"
  exit 1
fi

PORT=${PORT:-3000}

cd "$OUT_DIR"

echo "Servindo conteúdo estático em http://localhost:$PORT/evaluate_adr_front/"
echo "Pressione Ctrl+C para parar."

if command -v python3 >/dev/null 2>&1; then
  python3 -m http.server "$PORT" --bind 0.0.0.0
elif command -v python >/dev/null 2>&1; then
  # Python 2 fallback
  python -m SimpleHTTPServer "$PORT"
else
  echo "[ERRO] Python não encontrado. Instale 'python3' ou 'python' para servir os arquivos."
  exit 1
fi


