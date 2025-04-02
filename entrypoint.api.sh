#!/bin/sh
# Prisma client and push schema
pnpm nx run prisma:push

exec "$@"