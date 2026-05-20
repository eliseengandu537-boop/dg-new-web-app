# syntax=docker/dockerfile:1

FROM node:20-bookworm-slim AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-bookworm-slim AS builder
WORKDIR /app

ARG NEXT_PUBLIC_API_URL=
ARG NEXT_PUBLIC_AUTH_API_URL=
ARG NEXT_PUBLIC_ADMIN_API_URL=
ARG NEXT_PUBLIC_BACKEND_URL=
ARG API_PROXY_TARGET=
ARG API_URL=
ARG BACKEND_URL=
ARG UPLOADS_BASE_URL=

ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_AUTH_API_URL=${NEXT_PUBLIC_AUTH_API_URL}
ENV NEXT_PUBLIC_ADMIN_API_URL=${NEXT_PUBLIC_ADMIN_API_URL}
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}
ENV API_PROXY_TARGET=${API_PROXY_TARGET}
ENV API_URL=${API_URL}
ENV BACKEND_URL=${BACKEND_URL}
ENV UPLOADS_BASE_URL=${UPLOADS_BASE_URL}

COPY --from=deps /app/node_modules ./node_modules
COPY package.json package-lock.json next.config.js tsconfig.json ./
COPY public ./public
COPY src ./src

RUN npm run build

FROM node:20-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

EXPOSE 3000

CMD ["./node_modules/.bin/next", "start", "-H", "0.0.0.0", "-p", "3000"]
