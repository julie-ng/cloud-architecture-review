'use strict'
// process.env.DEBUG = 'nuxt:*'

const app = require('express')()
const pino = require('pino-http')()
const helmet = require('helmet')
const { loadNuxt, build } = require('nuxt')
const graceful = require('./shutdown')
const healthcheck = require('./routes/health')

const isDevelopment = process.env.NODE_ENV !== 'production'
const PORT = process.env.PORT || '3000'

app.use(pino)
app.use(helmet())
app.use('/health', healthcheck)

let server
const start = async function () {
  const nuxt = await loadNuxt(isDevelopment ? 'dev' : 'start')
  app.use(nuxt.render)
  if (isDevelopment) {
    build(nuxt)
  }

  try {
    server = app.listen(PORT)
    pino.logger.info(`Server up and listening on ${PORT}`)
  } catch (err) {
    pino.logger.error(err)
    process.exit(1)
  }
}

const onShutdown = async function (signal) {
  pino.logger.warn(`Received signal to terminate: ${signal}`)
  await server.close()
  process.exit()
}

start()
graceful(onShutdown, pino.logger)
