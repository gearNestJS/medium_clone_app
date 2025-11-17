# --- Образ для разработки ---
FROM node:20-alpine AS dev
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN rm -rf dist
CMD ["npm", "run", "start:dev"]

# --- Образ для продакшена ---
FROM node:20-alpine AS prod
WORKDIR /app
COPY package*.json ./
RUN npm install --production && npm cache clean --force
COPY . .
RUN npm run build
CMD ["node", "dist/main.js"]