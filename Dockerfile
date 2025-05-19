FROM node:20-alpine AS builder
WORKDIR /app

# Install all deps & build
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build    # outputs to .output/

# ---- Runtime Stage ----
FROM node:20-alpine AS runner
WORKDIR /app

# Copy built output
COPY --from=builder /app/.output .output

# Copy package manifest & lockfile into the server output dir
COPY --from=builder /app/package.json    .output/server/
COPY --from=builder /app/package-lock.json .output/server/

# Install only prod deps inside .output/server
RUN npm ci --omit=dev --prefix .output/server

ENV NODE_ENV=production
EXPOSE 3000

# Launch Nitro server
CMD ["node", ".output/server/index.mjs"]
