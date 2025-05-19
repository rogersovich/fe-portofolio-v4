# syntax=docker/dockerfile:1.4

# ---- Build Stage ----
  FROM node:20-alpine AS builder
  WORKDIR /app
  
  # cache modules & Go faster on rebuilds
  RUN apk add --no-cache git
  COPY package.json package-lock.json ./
  RUN --mount=type=cache,target=/go/pkg/mod \
      --mount=type=cache,target=/root/.cache/go-build \
      npm ci
  
  COPY . .
  RUN npm run build  # generates .output/
  
  # ---- Runtime Stage ----
  FROM node:20-alpine AS runner
  WORKDIR /app
  
  # Copy only the build output
  COPY --from=builder /app/.output .output
  
  # Copy manifest for prod install
  COPY --from=builder /app/package.json    .output/server/
  COPY --from=builder /app/package-lock.json .output/server/
  
  # Install only prod + skip optional, then prune caches
  RUN npm ci --omit=dev --omit=optional --prefix .output/server \
   && rm -rf /root/.npm /root/.cache /app/.output/server/.npmrc
  
  ENV NODE_ENV=production
  EXPOSE 3000
  CMD ["node", ".output/server/index.mjs"]
  