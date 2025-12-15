# ---- BUILD STAGE ----
FROM node:20-alpine AS builder
WORKDIR /app

# Paket dosyaları
COPY package.json ./
COPY package-lock.json* ./

RUN npm install

# Tüm projeyi kopyala
COPY . .

# Build al
RUN npm run build

# ---- PRODUCTION STAGE ----
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Don't run as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

# DOĞRU START KOMUTU
CMD ["node", "server.js"]
