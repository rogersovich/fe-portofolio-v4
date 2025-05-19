# syntax=docker/dockerfile:1.4
########################################
# 1) Builder stage: full deps & build
########################################
FROM node:20-slim AS builder
WORKDIR /app

# 1.1 Install build tools for any native bindings
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      python3 build-essential git && \
    rm -rf /var/lib/apt/lists/*

# 1.2 Install only prod deps (no dev / optional), then build
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --omit=optional

COPY . .
RUN npm run build    # outputs to .output/

########################################
# 2) Runner stage: prod only
########################################
FROM node:20-slim AS runner
WORKDIR /app

# 2.1 Copy only the built app and prod deps
COPY --from=builder /app/.output .output
COPY --from=builder /app/node_modules .output/server/node_modules

# 2.2 Clean up any stray cache (npm, apt)
RUN rm -rf /root/.npm \
    /root/.cache \
    /var/lib/apt/lists/*

ENV NODE_ENV=production
EXPOSE 3000

# 2.3 Launch Nitro SSR server
CMD ["node", ".output/server/index.mjs"]
