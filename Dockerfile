FROM node:17-alpine

ENV HOST '0.0.0.0'
EXPOSE ${PORT:-80}

WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm ci --production && npm run nuxt:build

USER node

CMD ["node", "server/express.js"]

