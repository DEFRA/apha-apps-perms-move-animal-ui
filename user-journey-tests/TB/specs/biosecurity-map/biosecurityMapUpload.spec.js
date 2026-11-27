import { browser } from '@wdio/globals'
import { waitForElement, waitForPagePath } from '../../helpers/page.js'
import biosecurityMapAnswersPage from '../../page-objects/biosecurity-map/biosecurityMapAnswersPage.js'
import mapUploadPage from '../../page-objects/biosecurity-map/mapUploadPage.js'
import uploadLoadingPage from '../../page-objects/biosecurity-map/uploadLoadingPage.js'
import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'

const assetsPath = 'user-journey-tests/TB/page-objects/biosecurity-map/assets'
const testFiles = {
  invalidType: `${assetsPath}/test_file.txt`,
  oversized: `${assetsPath}/large_file.jpg`,
  jpg: `${assetsPath}/happy_emoji.jpg`,
  pdf: `${assetsPath}/pdf_test.pdf`,
  png: `${assetsPath}/png_test.png`
}

const verifySuccessfulUpload = async (filePath) => {
  await mapUploadPage.uploadFileAndContinue(filePath)
  await waitForElement(mapUploadPage.loadingSpinner)
  await waitForPagePath(uploadLoadingPage.pagePath)
  await waitForElement(mapUploadPage.loadingSpinner)
  await waitForPagePath(biosecurityMapAnswersPage.pagePath)
}

describe('Biosecurity map upload tests', () => {
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to the upload page', async () => {
    await mapUploadPage.open('/')
    await browser.deleteCookies('language')
    await restoreSession()
    await mapUploadPage.navigateToPageAndVerifyTitle()
  })

  afterEach('Clear the language preference', async () => {
    await browser.deleteCookies('language')
  })

  it('should verify representative Welsh upload text and restore English', async () => {
    await mapUploadPage.verifyWelshAndEnglishTranslations()
  })

  it('should show an error when no file is uploaded', async () => {
    await mapUploadPage.uploadFileErrorTest()
  })

  it('should show a Welsh error for unsupported file type', async () => {
    await mapUploadPage.selectWelsh()
    await mapUploadPage.uploadFileErrorTest(
      testFiles.invalidType,
      mapUploadPage.welshFileTypeError
    )
  })

  it('should show an error for oversized file', async () => {
    await mapUploadPage.uploadFileErrorTest(
      testFiles.oversized,
      mapUploadPage.fileSizeError
    )
  })

  it('should upload a JPG with Welsh progress text and retain Welsh', async () => {
    await mapUploadPage.verifyWelshUploadProgress(testFiles.jpg)
  })

  it('should successfully upload a PDF file', async () => {
    await verifySuccessfulUpload(testFiles.pdf)
  })

  it('should successfully upload a PNG file', async () => {
    await verifySuccessfulUpload(testFiles.png)
  })
})
