FROM node:20.10-alpine

RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml nx.json ./ 

RUN pnpm install

COPY . .

ENV NODE_ENV development
ENV PORT 4000

EXPOSE 4000

CMD ["pnpm", "nx", "dev", "uff"]