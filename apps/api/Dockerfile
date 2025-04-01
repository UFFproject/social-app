FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

ENV fdfd="fdfd"
ENV NX_DAEMON=true
ENV NX_WORKSPACE_ROOT="/app"

RUN corepack enable

RUN apt-get update -y \
&& apt-get install -y openssl

WORKDIR /app

RUN pnpm config set store-dir /pnpm/store

# Installing dependencies with caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
COPY . .

EXPOSE 3000

RUN pnpm prisma generate --schema=libs/prisma/src/schema.prisma

CMD [ "pnpm", "nx" ]