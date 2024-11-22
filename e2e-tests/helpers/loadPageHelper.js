import { browser } from '@wdio/globals'

const loadPageAndVerifyTitle = async (path, pageTitle) => {
  await browser.url(path)
  await browser.waitUntil(
    async () => (await browser.getTitle()) === pageTitle,
    {
      timeout: 10000,
      timeoutMsg: `Failed to load page with title: ${pageTitle}`
    }
  )
}

export default loadPageAndVerifyTitle
