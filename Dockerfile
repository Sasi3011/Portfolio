# Build stage
FROM node:22.12.0-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM node:22.12.0-alpine

WORKDIR /app

# Install serve to run the application
RUN npm install -g serve

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Copy package.json for reference
COPY package.json ./

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start the application
CMD ["serve", "-s", "dist", "-l", "3000"]
