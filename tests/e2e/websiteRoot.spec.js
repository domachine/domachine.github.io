import { websiteBaseURL } from '#fixture/config.js'
import { expect, test } from '#fixture/playwright.js'

test('shows home page', async ({ page }) => {
  await page.goto(websiteBaseURL.href)

  await expect(page.getByText('Hello world!')).toBeVisible()
})
