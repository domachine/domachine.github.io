import { html } from '#vendor/htmlTemplating/lib.js'

/**
 * @param {import('./appContext.js').AppContext} ctx
 * @param {import('./locals.js').Locals} locals
 * @param {object} params
 * @param {import('#vendor/htmlTemplating/lib.js').SafeHTML} params.body
 * @param {import('#vendor/htmlTemplating/lib.js').SafeHTML} [params.head]
 */
export default function layout(ctx, locals, { head, body }) {
  return html`
    <!doctype html>
    <html>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link
          rel="icon"
          href="${locals.resources['icon.svg']}"
          type="image/svg+xml"
        />
        <link
          rel="apple-touch-icon"
          href="${locals.resources['apple-touch-icon.png']}"
        />
        <link rel="manifest" href="${ctx.urls.manifest().href}" />
        <title>Blank</title>
        <link rel="stylesheet" href="${locals.resources['main.css']}" />
        ${head}
      </head>
      <body>
        ${body}
      </body>
    </html>
  `
}
