# Базовый образ с Node.js
FROM node:22-alpine

# Рабочая директория
WORKDIR /app

# Копируем файлы зависимостей
COPY package.json pnpm-lock.yaml ./

# Устанавливаем pnpm (или npm/yarn, если ты их юзаешь)
RUN npm install -g pnpm

# Ставим зависимости
RUN pnpm install

# Копируем весь проект
COPY . .

# Собираем проект
RUN pnpm run build

# Добавляем Nginx
RUN apk add nginx

# Копируем конфиг Nginx (создадим его позже)
COPY nginx.conf /etc/nginx/nginx.conf

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx и приложение
CMD ["sh", "-c", "nginx && pnpm start"]