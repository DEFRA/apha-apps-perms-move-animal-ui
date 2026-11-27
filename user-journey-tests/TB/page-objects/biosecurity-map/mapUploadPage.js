import {
  waitForElement,
  waitForPagePath,
  selectLinkAndVerifyTitle,
  validateElementVisibleAndText
} from '../../helpers/page.js'
import { Page } from '../page.js'
import path from 'node:path'
import uploadLoadingPage from './uploadLoadingPage.js'
import biosecurityMapAnswersPage from './biosecurityMapAnswersPage.js'

const pageId = 'status.form.file'

const pageHeadingAndTitle = 'Upload a biosecurity map'

class BiosecurityMapUploadPage extends Page {
  pagePath = 'biosecurity-map/upload-plan'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
  noInputError = 'You need to upload your biosecurity map'
  wrongFileTypeError = 'The selected file must be a PNG, JPEG or PDF'
  welshFileTypeError = "Rhaid i'r ffeil fod yn PNG, JPEG neu PDF"
  fileSizeError = 'The selected file must be smaller than 10 MB'

  get fileInput() {
    return $('[data-testid="file-biosecuritymap-upload"]')
  }

  get fileUploadControl() {
    return $(`[id="${pageId}"]`)
  }

  get loadingSpinner() {
    return $('[data-testid="upload-spinner"]')
  }

  get introText() {
    return $('main form p')
  }

  inputFieldError() {
    return $('[id="status.form.file-error"]')
  }

  summaryErrorLink() {
    return super.getErrorLink(pageId)
  }

  async uploadFileAndContinue(fileName) {
    // Resolve path from project root (compatible with local & BrowserStack)
    const filePath = path.resolve(process.cwd(), fileName)

    // Upload the local file to BrowserStack’s remote environment
    const remoteFilePath = await browser.uploadFile(filePath)

    // Set the file input with the remote path
    await waitForElement(this.fileUploadControl)
    await waitForElement(this.fileInput, { visible: false })
    await this.fileInput.addValue(remoteFilePath)

    await super.selectContinue()
  }

  async uploadFileErrorTest(fileName, errorText = this.noInputError) {
    if (fileName) {
      await this.uploadFileAndContinue(fileName)
    } else {
      await super.selectContinue()
    }
    await super.verifyErrorsOnPage(this.inputFieldError(), errorText)
    await super.verifySummaryErrorLink(
      this.summaryErrorLink(),
      this.fileUploadControl
    )
  }

  getContinueButton() {
    return $('#continue-button')
  }

  async selectWelsh() {
    await selectLinkAndVerifyTitle(
      this.getLanguageLink('cy'),
      'Llwythwch fap bioddiogelwch i fyny'
    )
  }

  async verifyWelshAndEnglishTranslations() {
    await this.selectWelsh()
    await validateElementVisibleAndText(
      this.introText,
      "Mae angen i chi lwytho map o'r fferm neu'r safle i fyny."
    )
    await validateElementVisibleAndText(this.fileUploadControl, 'Dewis ffeil')

    await selectLinkAndVerifyTitle(this.getLanguageLink('en'), this.pageTitle)
    await validateElementVisibleAndText(
      this.introText,
      'You need to upload a map of the farm or premises.'
    )
    await validateElementVisibleAndText(this.fileUploadControl, 'Choose file')
  }

  async verifyWelshUploadProgress(fileName) {
    await this.selectWelsh()
    await this.uploadFileAndContinue(fileName)
    await waitForElement(this.loadingSpinner)
    await waitForPagePath(uploadLoadingPage.pagePath)
    await uploadLoadingPage.verifyWelshTranslation()
    await waitForPagePath(biosecurityMapAnswersPage.pagePath)
    await expect($('html')).toHaveAttribute('lang', 'cy')
  }
}

export default new BiosecurityMapUploadPage()
