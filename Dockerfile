# ─── STAGE 1: BUILD ─────────────────────────────────────────────────────────────
FROM node:18-alpine AS build
WORKDIR /app

# Copia y build de Angular
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production

# ─── STAGE 2: RUN ──────────────────────────────────────────────────────────────
FROM nginx:latest

# Limpiar la carpeta por defecto de nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar el build completo de Angular
COPY --from=build /app/dist/angular-project/browser /usr/share/nginx/html

# Copiar la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]
