# ==========================================
# STAGE 1: DEPS (Instalar dependencias)
# ==========================================
FROM node:18-alpine AS deps
# libc6-compat es necesario en Alpine para algunas librerías nativas
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 1. Habilitamos pnpm vía Corepack (La forma moderna y limpia)
RUN corepack enable && corepack prepare pnpm@latest --activate

# 2. Copiamos SOLO los archivos de definición para aprovechar el caché de capas de Docker
COPY package.json pnpm-lock.yaml ./

# 3. Instalación estricta (frozen-lockfile es el equivalente a npm ci)
# Esto asegura que se instalan EXACTAMENTE las versiones del lockfile
RUN pnpm install --frozen-lockfile --prod

# ==========================================
# STAGE 2: BUILDER (Construir la app)
# ==========================================
FROM node:18-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copiamos las dependencias instaladas en el paso anterior
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Deshabilitamos telemetría durante el build
ENV NEXT_TELEMETRY_DISABLED 1

# 4. Construimos el proyecto
RUN pnpm run build

# ==========================================
# STAGE 3: RUNNER (Imagen Final Ligera)
# ==========================================
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Seguridad: Crear usuario no-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiamos assets públicos
COPY --from=builder /app/public ./public

# Configuración de permisos para la caché de next
RUN mkdir .next
RUN chown nextjs:nodejs .next

# === COPIA INTELIGENTE (Standalone) ===
# Next.js Standalone infiere lo necesario y lo pone en una carpeta aislada.
# Esto reduce drásticamente el tamaño de la imagen.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Cambiamos al usuario seguro
USER nextjs

EXPOSE 3000
ENV PORT 3000

# OJO: En modo standalone, se ejecuta con 'node', no con 'pnpm start'
CMD ["node", "server.js"]