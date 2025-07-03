#!/bin/bash
set -e

# Load image vars
source .env

echo "🚀 Started Deploying Web and App based on Image version $IMAGE_VERSION"

# Ensure shared network exists
 

# Start dependencies (Mongo, Redis, Nginx)
docker-compose -f docker-compose.override.v${IMAGE_VERSION}.yml --env-file .env up  


# Deploy to Swarm
# docker stack deploy -c stack.yml ${PROJECT_NAME}
