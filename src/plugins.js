import express from 'express'

const plugins = await Promise.all(
  [import('./plugins/devServer.js'), import('./plugins/manifest.js')].map((p) =>
    p.catch(() => null),
  ),
).then((plugins) => plugins.map((p) => p?.default))

/**
 * @param {import('./appContext.js').AppContext} ctx
 */
export default function (ctx) {
  const router = express.Router()

  for (const plugin of plugins) {
    if (!plugin) continue
    ctx.logger.info('loading plugin ' + plugin.name)
    router.use(plugin(ctx))
  }

  return router
}
