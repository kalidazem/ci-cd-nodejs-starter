#!/bin/bash
set -e
# source ./get-image-version.sh
# echo "🚀 Using version: $IMAGE_VERSION"
source .env
 
docker-compose -f docker-compose.yml --env-file .env build

echo "🔧 Finished building images"
