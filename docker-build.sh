#!/bin/bash
set -e

API_IMAGE_NAME="uff-api"
WEB_IMAGE_NAME="uff-web"

echo "Building base image:"
docker build -f docker/Dockerfile.base -t uff-base .

echo "Building API image:"
docker build -f docker/Dockerfile.api -t $API_IMAGE_NAME .

echo "Building Web image:"
docker build -f docker/Dockerfile.web -t $WEB_IMAGE_NAME .

echo "All images built!"