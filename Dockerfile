# Stage 1: build
  FROM node:20-alpine AS builder
  WORKDIR /app
  COPY package*.json ./
  RUN npm install

  COPY . .

  ARG VITE_GRAPHQL_URL
  ARG VITE_API_URL
  ARG VITE_GITHUB_CLIENT_ID
  ARG VITE_GITHUB_REDIRECT_URI
  ARG VITE_GOOGLE_CLIENT_ID
  ARG VITE_GOOGLE_REDIRECT_URI

    RUN npm run build && \
      cp node_modules/maplibre-gl/dist/maplibre-gl-worker.mjs dist/assets/maplibre-gl-worker.mjs && \
      cp node_modules/maplibre-gl/dist/maplibre-gl-shared.mjs dist/assets/maplibre-gl-shared.mjs

  # Stage 2: serve
  FROM caddy:2-alpine AS runtime

  COPY --from=builder /app/dist /srv

  RUN printf ':3001 {\n    root * /srv\n\n    @static path /assets/* /favicon.svg\n    handle @static {\n        file_server\n    }\n\n    handle {\n        try_files {path} /index.html\n        file_server\n    }\n}\n' > /etc/caddy/Caddyfile

  EXPOSE 3001

  CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]