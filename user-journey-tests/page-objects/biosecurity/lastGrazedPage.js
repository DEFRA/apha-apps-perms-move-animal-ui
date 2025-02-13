import { Page } from '../page.js'
import { waitForPagePath } from '../../helpers/page.js'
import * as page from '../../helpers/page.js'

const pageId = 'lastGrazed'

const pageHeadingAndTitle = 'How long ago was the field last grazed by cattle?'

class LastGrazedPage extends Page {
  pagePath = 'biosecurity/last-grazed'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle

  noInputError = 'Enter when the field was last grazed by cattle'

  lastGrazedInput() {
    return super.getInputField(pageId)
  }

  lastGrazedFieldError() {
    return super.getErrorElement(pageId)
  }

  lastGrazedErrorLink() {
    return super.getErrorLink(pageId)
  }

  async inputLastGrazedAndContinue(text, newPage) {
    await page.typeIntoElement(this.lastGrazedInput(), text)
    await super.selectContinue()
    if (newPage) {
      await waitForPagePath(newPage.pagePath)
    }
  }

  async lastGrazedErrorTest(textInput, errorMessage) {
    await this.inputLastGrazedAndContinue(textInput)
    await super.verifyErrorsOnPage(this.lastGrazedFieldError(), errorMessage)
    await super.verifySummaryErrorLink(
      this.lastGrazedErrorLink(),
      this.lastGrazedInput()
    )
    const inputValue = await this.lastGrazedInput().getValue()
    expect(inputValue).toBe(textInput)
  }
}

export default new LastGrazedPage()
