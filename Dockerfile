# Dockerfile (multi-stage)

# ---- Build Stage ----
  FROM node:20-alpine AS builder
  WORKDIR /app
  
  # Install dependencies
  COPY package*.json ./
  RUN npm ci
  
  # Copy source & build
  COPY . .
  RUN npm run build    # outputs to .output/
  
  # ---- Runtime Stage ----
  FROM node:20-alpine AS runner
  WORKDIR /app
  
  # Copy only build output and production deps
  COPY --from=builder /app/.output/ .output/
  COPY --from=builder /app/package*.json ./
  RUN npm ci --omit=dev
  
  ENV NODE_ENV=production
  EXPOSE 3000
  
  # Launch Nitro server
  CMD ["node", ".output/server/index.mjs"]
  