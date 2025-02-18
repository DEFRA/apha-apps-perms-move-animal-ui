import { Page } from '../page.js'
import { waitForPagePath } from '../../helpers/page.js'
import * as page from '../../helpers/page.js'

const pageId = 'earTags'

const pageHeadingAndTitle =
  'Enter the ear tag numbers of the animals you are planning to move'

class EarTagsPage extends Page {
  pagePath = 'identification/enter-ear-tags'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle

  noInputError =
    'Enter the ear tag numbers of the animals you are planning to move'

  earTagsInput() {
    return super.getInputField(pageId)
  }

  earTagsFieldError() {
    return super.getErrorElement(pageId)
  }

  earTagsErrorLink() {
    return super.getErrorLink(pageId)
  }

  async inputEarTagsAndContinue(text, nextPage) {
    await page.typeIntoElement(this.earTagsInput(), text)
    await super.selectContinue()
    if (nextPage) {
      await waitForPagePath(nextPage.pagePath)
    }
  }

  async earTagsErrorTest(textInput, errorMessage) {
    await this.inputEarTagsAndContinue(textInput)
    await super.verifyErrorsOnPage(this.earTagsFieldError(), errorMessage)
    await super.verifySummaryErrorLink(
      this.earTagsErrorLink(),
      this.earTagsInput()
    )
    const inputValue = await this.earTagsInput().getValue()
    expect(inputValue).toBe(textInput)
  }
}

export default new EarTagsPage()
