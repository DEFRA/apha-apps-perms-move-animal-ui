import { waitForElement } from '../../helpers/page.js'
import { Page } from '../page.js'
import path from 'node:path'

const pageId = 'status.form.file'

const pageHeadingAndTitle = 'Upload a biosecurity map'

class BiosecurityMapUploadPage extends Page {
  pagePath = 'biosecurity-map/upload-plan'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
  noInputError = 'You need to upload your biosecurity map'
  wrongFileTypeError =
    'The selected file must be a BMP, GIF, JPEG, SVG, TIF, WEBP, APNG, AVIF or PDF'

  get fileInput() {
    return $('[data-testid="file-biosecuritymap-upload"]')
  }

  get loadingSpinner() {
    return $('[data-testid="upload-spinner"]')
  }

  inputFieldError() {
    return super.getErrorElement(pageId)
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
    await waitForElement(this.fileInput)
    await this.fileInput.setValue(remoteFilePath)

    await super.selectContinue()
  }

  async uploadFileErrorTest(fileName) {
    if (fileName) {
      this.uploadFileAndContinue(fileName)
    } else {
      await super.selectContinue()
    }
    await super.verifyErrorsOnPage(this.inputFieldError(), this.noInputError)
    await super.verifySummaryErrorLink(this.summaryErrorLink(), this.fileInput)
  }
}

export default new BiosecurityMapUploadPage()
