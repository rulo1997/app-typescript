# Dockerfile optimizado para Desarrollo con Hot-Reloading

FROM node:20-alpine

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos los archivos de dependencias
COPY package*.json ./

# Instalamos TODAS las dependencias (incluyendo las de desarrollo)
RUN npm install

# Copiamos el resto del código. El volumen se encargará de mantenerlo sincronizado.
COPY . .

# Exponemos el puerto de la aplicación
EXPOSE 3000

# El comando para iniciar el servidor en modo desarrollo
CMD ["npm", "run", "dev"]