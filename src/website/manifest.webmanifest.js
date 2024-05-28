/**
 * @param {import("#appContext.js").AppContext} _ctx
 * @param {import("#locals.js").Locals} locals
 * @returns
 */
export default async function (_ctx, locals) {
  return JSON.stringify({
    icons: [
      {
        src: locals.resources['icon-192.png'],
        type: 'image/png',
        sizes: '192x192',
      },
      {
        src: locals.resources['icon-512.png'],
        type: 'image/png',
        sizes: '512x512',
      },
    ],
  })
}
