import { expect, test as baseTest } from '@playwright/test'

const test =
  /** @type {typeof baseTest.extend<import('./playwright/testFixtures.js').TestFixtures>} */ (
    baseTest.extend
  )({})

export { expect, test }
