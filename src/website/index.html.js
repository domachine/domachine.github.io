import { html } from '#vendor/htmlTemplating/lib.js'
import layout from '../layout.html.js'

/**
 * @param {import('#appContext.js').AppContext} ctx
 * @param {import('#locals.js').Locals} locals
 */
export default async function (ctx, locals) {
  return html`
    ${layout(ctx, locals, {
      head: html`<link rel="stylesheet" href="${locals.resources['home.css']}" />`,
      body: html`
        <main>
          <h1>Something new is coming up!</h1>
          <p>Stay tuned!</p>
        </main>
      `,
    })}
  `.toString()
}
