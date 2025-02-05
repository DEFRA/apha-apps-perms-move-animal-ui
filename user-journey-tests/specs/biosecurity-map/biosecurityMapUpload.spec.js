/* eslint-disable no-console */
import { waitForPagePath } from '../../helpers/page.js'
import mapUploadPage from '../../page-objects/biosecurity-map/mapUploadPage.js'
import uploadLoadingPage from '../../page-objects/biosecurity-map/uploadLoadingPage.js'

describe('Biosecurity map upload test', () => {
  beforeEach('Navigate to biosecurity map upload page', async () => {
    await mapUploadPage.navigateToPageAndVerifyTitle()

    // Fetch and log the page response
    const response = await browser.execute(async () => {
      return fetch(window.location.href, { method: 'GET' })
        .then((res) => ({
          url: res.url,
          status: res.status,
          statusText: res.statusText,
          headers: Object.fromEntries(res.headers.entries())
        }))
        .catch((err) => ({ error: err.message }))
    })

    await console.log('🌐 Page Response:', response)
  })

  it('Should verify upload flow', async () => {
    await mapUploadPage.uploadFileAndContinue()
    await waitForPagePath(uploadLoadingPage.pagePath)
  })
})
