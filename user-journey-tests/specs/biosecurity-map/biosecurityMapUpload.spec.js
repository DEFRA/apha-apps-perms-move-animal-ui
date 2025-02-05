import { waitForPagePath } from '../../helpers/page.js'
import mapUploadPage from '../../page-objects/biosecurity-map/mapUploadPage.js'
import uploadLoadingPage from '../../page-objects/biosecurity-map/uploadLoadingPage.js'

describe('Biosecurity map upload test', () => {
  beforeEach('Navigate to biosecurity map upload page', async () => {
    await mapUploadPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify upload flow', async () => {
    await mapUploadPage.uploadFileAndContinue()
    await waitForPagePath(uploadLoadingPage.pagePath)
  })
})
