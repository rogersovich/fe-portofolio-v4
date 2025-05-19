# Build Stage 1
FROM node:20-alpine AS builder

WORKDIR /app

# Install all deps & build
COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build    # outputs to .output/

# Build Stage 2
FROM node:20-alpine AS runner
WORKDIR /app

# Only `.output` folder is needed from the build stage
COPY --from=builder /app/.output .output

ENV NODE_ENV=production
EXPOSE 3000

# Launch Nitro server
CMD ["node", ".output/server/index.mjs"]
