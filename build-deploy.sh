#!/bin/bash

set -e

echo "📥 Syncing with main..."
git fetch origin main
git reset --hard origin/main
git clean -fd

echo "🔑 Writing .env files..."
# Inject secrets passed in as env vars
echo "$API_ENV" > ./api/.env
echo "$WEB_ENV" > ./web/.env

VERSION=$1
echo "🧱 Building version: $VERSION"

cat <<EOF > docker-compose.new.yml
version: '3'

services:
  app-${VERSION}:
    build:
      context: ./api
    image: app:${VERSION}
    container_name: app-${VERSION}
    env_file:
      - ./api/.env
    expose:
      - '3000'
    command: npm run start
    networks:
      - app-net

  web-${VERSION}:
    build:
      context: ./web
    image: web:${VERSION}
    container_name: web-${VERSION}
    env_file:
      - ./web/.env
    expose:
      - '4000'
    command: node build
    networks:
      - app-net

networks:
  app-net:
    external:
      name: ci-cd-nodejs-starter_app-net
EOF

echo "✅ docker-compose.new.yml created"
docker-compose -f docker-compose.new.yml up -d --build
