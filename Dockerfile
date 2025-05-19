# Dockerfile (multi-stage, fixed lockfile location)

# ---- Build Stage ----
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM gcr.io/distroless/nodejs:20 AS runner
WORKDIR /app
COPY --from=builder /app/.output .output

# prod-only into .output
COPY --from=builder /app/package.json    .output/server/
COPY --from=builder /app/package-lock.json .output/server/
RUN npm ci --omit=dev --omit=optional --prefix .output/server

EXPOSE 3000
CMD ["./server/index.mjs"]
