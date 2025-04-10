# syntax=docker/dockerfile:1

FROM node:23.11.0-slim AS base
RUN npm install -g pnpm

FROM base as dependencies
WORKDIR /app
COPY package*.json pnpm*.yaml ./
RUN pnpm install

FROM base AS build
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN pnpm run build
RUN pnpm prune --prod

FROM gcr.io/distroless/nodejs22-debian12 AS deploy
USER 1000
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
EXPOSE 3333
CMD ["dist/server.js"]
