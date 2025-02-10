import { Page } from '../page.js'
import * as page from '../../helpers/page.js'

const pageId = 'grazingFieldHowSeparated'

const pageHeadingAndTitle =
  'How is this grazing field separated from the resident herd?'

class HowFieldSeparatedPage extends Page {
  pagePath = 'biosecurity/grazing-field-how-separated'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle

  noInputError =
    'Enter information about how this grazing field is separated from the resident herd'

  separatedGrazingInput() {
    return super.getInputField(pageId)
  }

  separatedGrazingFieldError() {
    return super.getErrorElement(pageId)
  }

  separatedGrazingErrorLink() {
    return super.getErrorLink(pageId)
  }

  async inputSeparatedGrazingAndContinue(text) {
    await page.typeIntoElement(this.separatedGrazingInput(), text)
    await super.selectContinue()
  }

  async fieldSeparatedErrorTest(textInput, errorMessage) {
    await this.inputSeparatedGrazingAndContinue(textInput)
    await super.verifyErrorsOnPage(
      this.separatedGrazingFieldError(),
      errorMessage
    )
    await super.verifySummaryErrorLink(
      this.separatedGrazingErrorLink(),
      this.separatedGrazingInput()
    )
    const inputValue = await this.separatedGrazingInput().getValue()
    expect(inputValue).toBe(textInput)
  }
}

export default new HowFieldSeparatedPage()
