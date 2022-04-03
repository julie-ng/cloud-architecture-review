FROM node:14-alpine
RUN apk add --update --no-cache curl dumb-init

ENV NODE_ENV production
ENV HOST '0.0.0.0'
EXPOSE ${PORT:-80}

WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm ci --production && npm run nuxt:build

USER node

HEALTHCHECK --interval=5m --timeout=3s \
  CMD curl -f http://localhost:${PORT}/health || exit 1

CMD ["dumb-init", "node", "server/express.js"]
