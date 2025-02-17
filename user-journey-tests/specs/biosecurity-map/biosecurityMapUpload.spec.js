import { waitForElement, waitForPagePath } from '../../helpers/page.js'
import biosecurityMapAnswersPage from '../../page-objects/biosecurity-map/biosecurityMapAnswersPage.js'
import mapUploadPage from '../../page-objects/biosecurity-map/mapUploadPage.js'
import uploadLoadingPage from '../../page-objects/biosecurity-map/uploadLoadingPage.js'

describe('Biosecurity map upload test', () => {
  beforeEach('Navigate to biosecurity map upload page', async () => {
    await mapUploadPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that the page errors when no input is given', () => {
    mapUploadPage.uploadFileErrorTest()
  })

  it('Should verify that the page errors when no input is given', () => {
    mapUploadPage.uploadFileErrorTest(
      'user-journey-tests/page-objects/biosecurity-map/testFile.txt'
    )
  })

  it('Should verify upload flow', async () => {
    await mapUploadPage.uploadFileAndContinue(
      'user-journey-tests/page-objects/biosecurity-map/happy_emoji.jpg'
    )
    await waitForElement(mapUploadPage.loadingSpinner)
    await waitForPagePath(uploadLoadingPage.pagePath)
    await waitForElement(mapUploadPage.loadingSpinner)
    await waitForPagePath(biosecurityMapAnswersPage.pagePath)
  })
})
