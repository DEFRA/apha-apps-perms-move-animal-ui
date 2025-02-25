import { Page } from '../page.js'
import * as page from '../../helpers/page.js'

const cphId = 'cphNumber'

class CPHBasePage extends Page {
  invalidFormatError =
    'Enter the CPH number in the correct format, for example, 12/345/6789'

  noInputError = 'Enter the farm or premises CPH number'

  cphNumberInput() {
    return super.getInputField(cphId)
  }

  cphInputFieldError() {
    return super.getErrorElement(cphId)
  }

  cphSummaryErrorLink() {
    return super.getErrorLink(cphId)
  }

  async inputParishHoldingNumberAndContinue(text, nextPage) {
    await page.typeIntoElement(this.cphNumberInput(), text)
    await super.selectContinue()
    if (nextPage) {
      await page.waitForPagePath(nextPage.pagePath)
    }
  }

  async parishHoldingErrorTest(textInput, errorMessage) {
    await this.inputParishHoldingNumberAndContinue(textInput)
    await super.verifyErrorsOnPage(this.cphInputFieldError(), errorMessage)
    await super.verifySummaryErrorLink(
      this.cphSummaryErrorLink(),
      this.cphNumberInput()
    )
    const inputValue = await this.cphNumberInput().getValue()
    expect(inputValue).toBe(textInput)
  }
}

export { CPHBasePage }
