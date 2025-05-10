#!/bin/bash

set -e

CONTAINER_NAME="uff-database"

if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
  echo "Removing existing container..."
  docker rm -f $CONTAINER_NAME
fi

VOLUME_NAME="db"
if ! docker volume ls -q | grep -q "^$VOLUME_NAME\$"; then
  echo "Creating Docker volume '$VOLUME_NAME'..."
  docker volume create $VOLUME_NAME
fi

echo "Starting PostgreSQL container..."
docker run -d \
  --name $CONTAINER_NAME \
  -e POSTGRES_USER=uff \
  -e POSTGRES_DB=uffdb \
  -e POSTGRES_HOST_AUTH_METHOD=trust \
  -e PGDATA=/data/postgres \
  -p 5432:5432 \
  --restart=always \
  --health-cmd="pg_isready -U uff -d uffdb" \
  --health-interval=5s \
  --health-timeout=5s \
  --health-retries=5 \
  -v db:/data/postgres \
  postgres:17.4-alpine

echo "PostgreSQL container '$CONTAINER_NAME' is running and accessible at localhost:5432"

# Getting .env file
if [ ! -f .env.development ]; then
  echo "Creating .env.development file..."
  cp .env.example .env.development
elif [ ! -f .env.example ]; then
  echo "No .env.example file found."
  exit 1
else
  echo ".env.development file already exists. Skipping creation."
fi

# Loading environment variables
export $(grep -v '^#' .env.development | xargs)

sh scripts/pushd.sh
echo "Prisma client and schema pushed successfully"