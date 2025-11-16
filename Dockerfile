# Используем официальный образ Node.js
FROM node:20-alpine AS builder

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./

# Устанавливаем зависимости (включая devDependencies, т.к. нужен TypeScript для сборки)
RUN npm install

# Копируем исходный код
COPY . .

# Собираем проект (команда npm run build)
RUN npm run build


# --- Финальный образ ---
FROM node:20-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем зависимости из builder-образа
COPY --from=builder /app/node_modules ./node_modules

# Копируем скомпилированный JavaScript код из builder-образа
COPY --from=builder /app/dist ./dist

# Копируем package.json для команды запуска
COPY package*.json ./

# Указываем команду по умолчанию для запуска приложения
CMD ["node", "dist/main.js"]
