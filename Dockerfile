# Этап 1: Сборка проекта
FROM node:22-slim AS builder

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
RUN pnpm add -D tailwindcss
COPY . .
# Увеличиваем лимит памяти
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN pnpm build
RUN ls -la /app/.output || echo ".output не создана"

# Этап 2: Финальный образ
FROM node:22-slim

COPY --from=builder /app/.output .output
COPY --from=builder /app/package.json .

EXPOSE 80
CMD ["sh", "-c", "node .output/server/index.mjs"]