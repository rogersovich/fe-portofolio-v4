# syntax=docker/dockerfile:1.4

# ---- 1) Builder Stage ----
  FROM node:20-alpine AS builder
  WORKDIR /app
  
  # 1.1 Install only production deps (skip dev & optional)
  COPY package.json package-lock.json ./
  RUN npm ci --omit=dev --omit=optional \
    && rm -rf /root/.npm /root/.cache
  
  # 1.2 Build your Nuxt app
  COPY . .
  RUN npm run build   # creates .output/
  
  # ---- 2) Runtime Stage ----
  FROM node:20-alpine AS runner
  WORKDIR /app
  
  # 2.1 Copy built output
  COPY --from=builder /app/.output .output
  
  # 2.2 Copy production node_modules into Nitro’s server dir
  COPY --from=builder /app/node_modules .output/server/node_modules
  
  ENV NODE_ENV=production
  EXPOSE 3000
  
  # 2.3 Launch Nitro server
  CMD ["node", ".output/server/index.mjs"]
  