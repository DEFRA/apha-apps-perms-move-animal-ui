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

  lastGrazedInput() {
    return super.getInputField(pageId)
  }

  lastGrazedFieldError() {
    return super.getErrorElement(pageId)
  }

  lastGrazedErrorLink() {
    return super.getErrorLink(pageId)
  }

  async inputLastGrazedAndContinue(text) {
    await page.typeIntoElement(this.lastGrazedInput(), text)
    await super.selectContinue()
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

export default new HowFieldSeparatedPage()
