FROM node:alpine

# Install pnpm globally
RUN npm install -g pnpm

# Create app directory and assign to non-root user
RUN mkdir -p /usr/src/app && chown -R node:node /usr/src/app

# Switch to app dir and non-root user
WORKDIR /usr/src/app


USER node

COPY --chown=node:node src ./src
# Copy only lockfile and package manifest for dependency caching
# COPY package.json pnpm-lock.yaml ./
COPY --chown=node:node package.json pnpm-lock.yaml ecosystem.config.json ./

RUN ls -la
RUN cat package.json
RUN pnpm install

# Install deps
# RUN pnpm install && ls -la node_modules
