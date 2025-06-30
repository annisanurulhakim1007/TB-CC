# Gunakan base image Node.js versi 22
FROM node:22

# Tetapkan direktori kerja di dalam container
WORKDIR /usr/src/app

# Salin file package.json dan package-lock.json terlebih dahulu
# Ini memanfaatkan cache Docker agar tidak install ulang jika tidak ada perubahan dependensi
COPY package*.json ./

# Install semua dependensi
RUN npm install

# Salin sisa kode aplikasi
COPY . .

# Beri tahu Docker bahwa container akan berjalan di port 8080
EXPOSE 8080

# Perintah untuk menjalankan aplikasi saat container dimulai
CMD [ "node", "index.js" ]