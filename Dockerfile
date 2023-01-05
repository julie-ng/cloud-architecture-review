FROM node:16-alpine

ARG OPENSSL_VERSION=3.0.7-r2

RUN apk add --update --no-cache \
  curl \
  dumb-init

RUN apk upgrade --update-cache --available && \
    apk add --update openssl=${OPENSSL_VERSION}

ENV NODE_ENV production
ENV HOST '0.0.0.0'
EXPOSE ${PORT:-80}

WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm ci --omit=dev && \
    npm run nuxt:build

USER node

HEALTHCHECK --interval=5m --timeout=3s \
  CMD curl -f http://localhost:${PORT}/health || exit 1

CMD ["dumb-init", "node", "server/express.js"]
