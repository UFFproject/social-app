FROM node:20-alpine3.19 AS dependencies

ENV PRISMA_SKIP_POSTINSTALL_GENERATE=true
ENV NX_DAEMON=true

WORKDIR /src/app
COPY . .

RUN npm install -g pnpm

RUN pnpm install --frozen-lockfile

EXPOSE 3000-4000