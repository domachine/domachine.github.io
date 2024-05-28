import { publicDir, publicRoot } from '#buildConfig.js'
import { Urls } from '#urls.js'
import { glob } from 'glob'
import { cp, mkdir, readFile, writeFile } from 'node:fs/promises'
import { pino } from 'pino'
import { fileURLToPath } from 'url'
import * as r from '#vendor/runtype/lib.js'
import assert from 'node:assert'
import { dirname, join } from 'node:path'
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

const resourceManifests = await readFile(
  new URL('manifest.json', publicDir),
  'utf-8',
).then((m) => JSON.parse(m))

/** @type {import('#locals.js').Locals} */
const locals = {
  resources: resourceManifests,
}

const NOW = new Date()

/** @type {import('#appContext.js').AppContext} */
const ctx = {
  clock: { now: () => NOW },
  logger: pino({ enabled: false }),
  urls: new Urls(new URL(config.website.baseUrl)),
}

for (const [path, m] of websiteFiles) {
  const output = join(fileURLToPath(publicRoot), path)
  await mkdir(dirname(output), { recursive: true })
  await writeFile(output, await m.default(ctx, locals))
}

await cp(new URL('static', import.meta.url), publicRoot, {
  recursive: true,
  force: true,
})

for (const file of await glob('*.js', {
  cwd: fileURLToPath(new URL('website', import.meta.url)),
})) {
  const output = fileURLToPath(new URL(file.replace(/\.js$/, ''), publicRoot))
  const m = await import(
    fileURLToPath(new URL(file, new URL('website/', import.meta.url)))
  )
  await mkdir(dirname(output), { recursive: true })
  await writeFile(output, await m.default(ctx, locals))
}
