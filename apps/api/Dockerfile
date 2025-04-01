FROM node:20-alpine AS base

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml nx.json ./

RUN pnpm install

COPY . .

RUN pnpm prisma generate

EXPOSE 3000

CMD ["pnpm", "nx", "serve", "api"] 