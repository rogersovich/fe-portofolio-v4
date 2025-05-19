# 1) Builder Stage: installs deps, builds your Nuxt app
FROM node:20-alpine AS builder
WORKDIR /app

# (Optional) install git if you pull private modules
RUN apk add --no-cache git

# 1.1 Copy manifests and cache Go modules between builds
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --omit=optional

# 1.2 Copy source and build
COPY . .
RUN npm run build    # outputs to .output/

# 2) Runtime Stage: only runtime code + prod deps
FROM node:20-alpine AS runner
WORKDIR /app

# 2.1 Copy build output
COPY --from=builder /app/.output .output

# 2.2 Copy production node_modules into Nitro’s server dir
COPY --from=builder /app/node_modules .output/server/node_modules

# 2.3 Prune any leftover npm cache (just in case)
RUN rm -rf /root/.npm /root/.cache

ENV NODE_ENV=production
EXPOSE 3000

# 2.4 Launch the Nitro SSR server
CMD ["node", ".output/server/index.mjs"]
