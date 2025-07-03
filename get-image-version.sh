#!/bin/bash
# get-version.sh
IMAGE_VERSION=$(node -p "require('./package.json').version")
APP_IMAGE="app:${IMAGE_VERSION}"
WEB_IMAGE="web:${IMAGE_VERSION}"
PROJECT_NAME="project_${IMAGE_VERSION}"

# Update or insert IMAGE_APP_NAME
grep -q '^IMAGE_APP_NAME=' .env && \
  sed -i "s/^IMAGE_APP_NAME=.*/IMAGE_APP_NAME=${APP_IMAGE}/" .env || \
  echo "IMAGE_APP_NAME=${APP_IMAGE}" >> .env

# Update or insert IMAGE_WEB_NAME
grep -q '^IMAGE_WEB_NAME=' .env && \
  sed -i "s/^IMAGE_WEB_NAME=.*/IMAGE_WEB_NAME=${WEB_IMAGE}/" .env || \
  echo "IMAGE_WEB_NAME=${WEB_IMAGE}" >> .env

grep -q '^PROJECT_NAME=' .env && \
  sed -i "s/^PROJECT_NAME=.*/PROJECT_NAME=${PROJECT_NAME}/" .env || \
  echo "PROJECT_NAME=${PROJECT_NAME}" >> .env

