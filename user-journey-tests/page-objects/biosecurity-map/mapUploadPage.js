import { waitForElement } from '../../helpers/page.js'
import { Page } from '../page.js'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

// Manually define __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const pageHeadingAndTitle = 'Upload a biosecurity map'

class BiosecurityMapUploadPage extends Page {
  pagePath = 'biosecurity-map/upload-plan'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  get fileInput() {
    return $('#biosecurity-upload-plan-file-upload')
  }

  async uploadFileAndContinue() {
    const filePath = await path.resolve(__dirname, './testFile.txt')
    await waitForElement(this.fileInput)
    await this.fileInput.setValue(filePath)
    await super.selectContinue()
  }
}

export default new BiosecurityMapUploadPage()
