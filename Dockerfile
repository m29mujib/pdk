# Tahap build
FROM node:18-bullseye AS build

WORKDIR /app

COPY package*.json ./

ENV ELECTRON_SKIP_BINARY_DOWNLOAD=1 \
    npm_config_unsafe_perm=true \
    npm_config_loglevel=info

RUN npm install

COPY . .

RUN npm run build

# Tahap produksi
FROM node:18-bullseye

# Install serve secara global
RUN npm install -g serve

# Salin hasil build dari tahap build
# COPY --from=build /app/build /app/build

COPY --from=build /app/dist /app/dist
WORKDIR /app/dist

# Port yang dibuka oleh container
EXPOSE 9007

# Jalankan aplikasi menggunakan serve
CMD ["serve", "-s", ".", "-l", "9007"]
