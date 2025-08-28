import { Page } from '../page.js'
import * as page from '../../helpers/page.js'

class SingleTextInputPage extends Page {
  constructor({ pageId, noInputError, invalidFormatError }) {
    super()
    this.pageId = pageId
    this.noInputError = noInputError
    this.invalidFormatError = invalidFormatError
  }

  textInput() {
    return super.getInputField(this.pageId)
  }

  inputFieldError() {
    return super.getErrorElement(this.pageId)
  }

  summaryErrorLink() {
    return super.getErrorLink(this.pageId)
  }

  async inputTextAndContinue(text, nextPage, isAutocomplete = false) {
    await page.typeIntoElement(this.textInput(), text, isAutocomplete)
    await super.selectContinue()
    if (nextPage) {
      await page.waitForPagePath(nextPage.pagePath)
    }
  }

  async singleInputErrorTest(textInput, errorMessage) {
    await this.inputTextAndContinue(textInput)
    await super.verifyErrorsOnPage(this.inputFieldError(), errorMessage)
    await super.verifySummaryErrorLink(
      this.summaryErrorLink(),
      this.textInput()
    )
    const inputValue = await this.textInput().getValue()
    expect(inputValue).toBe(textInput)
  }
}

export { SingleTextInputPage }
