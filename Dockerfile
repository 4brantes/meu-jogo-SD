# Estágio 1: Build do React usando Node
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Estágio 2: Servidor Apache para hospedar o jogo
FROM httpd:alpine
# Copia os arquivos gerados pelo Vite para a pasta pública do Apache
COPY --from=build /app/dist/ /usr/local/apache2/htdocs/
EXPOSE 80