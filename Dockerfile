## Stage 1 (production base)
FROM node:18-alpine as base

LABEL org.opencontainers.image.authors=cgreen@coretag.net
LABEL org.opencontainers.image.title="Yakk Backend"
LABEL org.opencontainers.image.url=https://hub.docker.com/r/coretag/yakk-backend
LABEL org.opencontainers.image.source=https://github.com/rcpilot/Yakk-Backend
LABEL org.opencontainers.image.licenses=GPL-3.0
LABEL com.coretag.nodeversion=$NODE_VERSION

ENV NODE_ENV=production

EXPOSE 3001
ENV PORT 3001

RUN apk add --no-cache tini curl

WORKDIR /app

COPY package*.json ./

RUN npm config list \
    && npm ci \
    && npm cache clean --force

ENV PATH /app/node_modules/.bin:$PATH

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["node", "build/index.js"]

## Stage 2 (development)
FROM base as dev

ENV NODE_ENV=development
    
RUN npm config list

RUN npm install \
    && npm cache clean --force

USER node

CMD ["ts-node-dev", "src/index.ts"]

## Stage 3 (build)
FROM dev as build

USER root

COPY . .

RUN tsc

## Stage 4 (testing)
FROM build as test

RUN npm audit

COPY --from=aquasec/trivy:latest /usr/local/bin/trivy /usr/local/bin/trivy
RUN trivy fs --severity "HIGH,CRITICAL" --no-progress --scanners vuln .

## Stage 5 (prune test files for production)
FROM test as clean
RUN rm -rf ./tests && rm -rf ./node_modules

## Stage 6 (production)
FROM base as prod

COPY --from=clean /app /app

HEALTHCHECK --interval=5m --timeout=3s \
  CMD curl -f http://localhost/ || exit 1

USER node