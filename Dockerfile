# Use Node.js 20 as base image
FROM node:20-slim AS base

# Install OpenSSL for PostgreSQL connection
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application source
COPY . .

# Build the application
RUN npm run build

# Production image
FROM node:20-slim AS runner
WORKDIR /app
COPY --from=base /app/dist ./dist
COPY --from=base /app/package*.json ./
COPY --from=base /app/node_modules ./node_modules

EXPOSE 5000
CMD ["npm", "start"]
