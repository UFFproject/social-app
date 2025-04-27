FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

ENV NX_DAEMON="false"
ENV NX_WORKSPACE_ROOT="/app"

RUN corepack enable

RUN apt-get update -y \
&& apt-get install -y openssl procps

WORKDIR /app

RUN pnpm config set store-dir /pnpm/store

# Installing dependencies with caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install
COPY . .

EXPOSE 3000
EXPOSE 9229

# Build prisma client
RUN pnpm nx run prisma:generate

CMD [ "pnpm", "nx", "serve", "api" ]
