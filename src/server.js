import assert from 'node:assert'
import { pinoHttp as PinoHttp } from 'pino-http'
import { pino as Pino } from 'pino'
import * as r from './vendor/runtype/lib.js'
import express from 'express'
import { Urls } from '#urls.js'
import plugins from '#plugins.js'
import { fileURLToPath } from 'node:url'
import * as posix from 'node:path/posix'
import { websiteFiles } from '#website.js'

const configParseResult = r.type({
  website: r.type({
    port: r.number(),
    baseUrl: r.string(),
  }),
})((await import('config')).default)

assert(
  configParseResult.type === 'VALUE',
  configParseResult.type === 'ERROR'
    ? `Failed to parse config: ${JSON.stringify(configParseResult.errors, null, 2)}`
    : undefined,
)

const config = configParseResult.value
const logger = Pino()

const abortController = new AbortController()

/** @type {import('#appContext.js').AppContext} */
const appContext = {
  logger,
  clock: { now: () => new Date() },
  urls: new Urls(new URL(config.website.baseUrl)),
}

const app = express()
const pinoHttp = PinoHttp({ logger })

app.use(pinoHttp)
app.use(plugins(appContext))
app.use(express.static(fileURLToPath(new URL('static', import.meta.url))))

app.get('*', (req, res, next) => {
  const locals = /** @type {import('./locals.js').Locals} */ (res.locals)

  const handle = async () => {
    let path
    let m = websiteFiles.get((path = req.path))
    if (!m) m = websiteFiles.get((path = posix.join(req.path, 'index.html')))
    if (!m) return next()
    const ext = posix.extname(path)
    if (ext === '.webmanifest' || ext === '.json') {
      res.contentType('application/manifest+json')
    }
    res.send(await m.default(appContext, locals))
  }

  handle().catch(next)
})

/** @type {import('node:http').Server} */
const srv = await new Promise((resolve) => {
  const srv = app.listen(config.website.port, () => {
    appContext.logger.info(srv.address(), 'listening')
    resolve(srv)
  })
})

process.on('SIGTERM', () => {
  logger.info('sigterm signal received')
  abortController.abort()
  Promise.resolve().then(async () => {
    await new Promise((resolve) => {
      srv.close(() => {
        resolve(null)
      })
    })
    logger.info('all set, terminating')
  })
})
