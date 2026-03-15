# 1. Imagen base
FROM node:20

# 2. Directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiar archivos de dependencias e instalar
COPY package*.json ./
RUN npm install

# 4. Copiar el resto del código
COPY . .

# 5. Puerto que usa la app
EXPOSE 3000

# 6. Comando para arrancar
CMD ["node", "index.js"]