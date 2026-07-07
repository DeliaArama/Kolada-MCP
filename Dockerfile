# syntax=docker/dockerfile:1

# ---- Build stage: compile TypeScript -> dist/ ----
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build          # tsc -> dist/ (produces dist/streamable-http.js)

# ---- Runtime stage: small production image ----
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV MCP_MODE=http
ENV PORT=3000
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
COPY README.md ./
EXPOSE 3000
# Run the Streamable HTTP entrypoint (Copilot Studio-compatible)
CMD ["node", "dist/streamable-http.js"]
