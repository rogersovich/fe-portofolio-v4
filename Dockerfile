# Dockerfile (multi-stage)

# ---- Build Stage ----
FROM node:20-alpine AS builder
WORKDIR /app

# install all deps & build
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build      # produces .output/

# 2) Runtime stage
FROM node:20-alpine AS runner
WORKDIR /app

# copy built output and manifest files
COPY --from=builder /app/.output .output
COPY --from=builder /app/package*.json ./

# install production deps into `.output/server/node_modules`
RUN npm ci --omit=dev --prefix .output/server

ENV NODE_ENV=production
EXPOSE 3000

# start Nitro server
CMD ["node", ".output/server/index.mjs"]
