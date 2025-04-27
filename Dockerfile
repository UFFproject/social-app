FROM node:22-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

ENV NX_DAEMON="true"
ENV PRISMA_SKIP_POSTINSTALL_GENERATE=true
ENV NX_WORKSPACE_ROOT="/app"

RUN corepack enable \
 && apt-get update -y \
 && apt-get install -y openssl procps curl

WORKDIR /app
RUN pnpm config set store-dir /pnpm/store

EXPOSE 3000
EXPOSE 4000
EXPOSE 9229

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install

COPY . .

FROM base AS development

RUN pnpm nx run prisma:generate