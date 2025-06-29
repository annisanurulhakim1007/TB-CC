# Gunakan base image Node.js versi 18
FROM node:18

# Set direktori kerja di dalam container
WORKDIR /usr/src/app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin sisa kode aplikasi
COPY . .

# Buka port 8080
EXPOSE 8080

# Perintah untuk menjalankan aplikasi
CMD [ "node", "index.js" ]