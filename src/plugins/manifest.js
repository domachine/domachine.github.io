/**
 * This plugin reloads the manifests during development (in case they changed
 * or are not available).
 */

import { readFile } from 'node:fs/promises'
import { publicDir } from '../buildConfig.js'

/**
 * @param {import('../appContext.js').AppContext} _ctx
 * @returns {import('express').Handler}
 */
export default function manifest(_ctx) {
  return (_req, res, next) => {
    const locals = /** @type {import('../locals.js').Locals} */ (res.locals)
    readFile(new URL('manifest.json', publicDir), 'utf-8')
      .then((m) => {
        const json = JSON.parse(m)
        locals.resources = new Proxy(json, {
          get(manifest, p) {
            if (!Object.hasOwn(manifest, p))
              throw new Error(`Resource '${String(p)}' not found`)
            return manifest[p]
          },
        })
        next()
      })
      .catch(next)
  }
}
