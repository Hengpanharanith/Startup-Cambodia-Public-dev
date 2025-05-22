FROM node:16-bullseye-slim AS builder
RUN mkdir -p workspace
WORKDIR /workspace

COPY . .

RUN npm install
RUN npm run build

FROM node:16-bullseye-slim AS workspace

COPY --from=builder /workspace ./workspace

WORKDIR /workspace

RUN chmod +x ./docker-entrypoint.sh

ENV SHELL /bin/sh
