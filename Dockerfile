# --- Образ для разработки ---
FROM node:20-alpine AS dev
WORKDIR /app
COPY package*.json ./
RUN npm install

# Копируем папку prisma в контейнер. Это необходимо для того, чтобы npx prisma generate мог найти вашу схему.
COPY prisma ./prisma
COPY . .

# Эта команда генерирует клиент Prisma на основе вашей schema.prisma.
# Клиент Prisma будет включен в node_modules и скомпилирован вместе с остальным кодом.
RUN npx prisma generate

RUN rm -rf dist

CMD ["npm", "run", "start:dev"]

# --- Образ для продакшена ---
FROM node:20-alpine AS prod
WORKDIR /app
COPY package*.json ./

# Устанавливаем только продакшн зависимости
RUN npm install --production && npm cache clean --force

# Копируем схему Prisma
COPY prisma ./prisma
COPY . .

# Генерируем клиент Prisma
RUN npx prisma generate
RUN npm run build
CMD ["node", "dist/main.js"]
