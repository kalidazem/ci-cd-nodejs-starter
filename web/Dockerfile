# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install

# Copy the app code
COPY . .

# Run the build
RUN pnpm build

# Stage 2: Run
FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm

# Copy built files only
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml* ./
COPY --from=builder /app/node_modules ./node_modules


EXPOSE 4000
CMD [ "node", "build" ]
