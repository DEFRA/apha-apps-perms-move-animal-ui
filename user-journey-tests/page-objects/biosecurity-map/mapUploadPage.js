import { waitForElement } from '../../helpers/page.js'
import { Page } from '../page.js'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

// Manually define __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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
    const filePath = await path.resolve(__dirname, fileName)
    await waitForElement(this.fileInput)
    await this.fileInput.setValue(filePath)
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
