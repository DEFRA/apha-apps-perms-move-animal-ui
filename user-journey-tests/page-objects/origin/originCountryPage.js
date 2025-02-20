import { Page } from '../page.js'
import * as page from '../../helpers/page.js'

const id = 'country'

const pageHeadingAndTitle = 'Which country are the animals coming from?'
class OriginCountryPage extends Page {
  pagePath = 'origin/country'

  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  noInputError = 'Enter which country the animals are coming from'
  maxCharacterError = 'Your answer must be no longer than 255 characters'

  input() {
    return super.getInputField(id)
  }

  fieldError() {
    return super.getErrorElement(id)
  }

  errorLink() {
    return super.getErrorLink(id)
  }

  async inputTextAndContinue(text, nextPage) {
    await page.typeIntoElement(this.input(), text)
    await super.selectContinue()
    if (nextPage) {
      await page.waitForPagePath(nextPage.pagePath)
    }
  }

  async inputErrorTest(textInput, errorMessage) {
    await this.inputTextAndContinue(textInput)
    await super.verifyErrorsOnPage(this.fieldError(), errorMessage)
    await super.verifySummaryErrorLink(this.errorLink(), this.input())
    const inputValue = await this.input().getValue()
    expect(inputValue).toBe(textInput)
  }
}

export default new OriginCountryPage()
