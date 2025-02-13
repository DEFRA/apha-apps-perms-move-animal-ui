import { Page } from '../page.js'
import * as page from '../../helpers/page.js'

const pageId = 'disinfectant'

const pageHeadingAndTitle = 'What disinfectant are you using?'

class DisinfectantPage extends Page {
  pagePath = 'biosecurity/disinfectant'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle

  noInputError = 'Enter what disinfectant you are using'

  get disinfectantGovLink() {
    return $('a*=disinfectant approved for Tuberculosis')
  }

  whatDisinfectantInput() {
    return super.getInputField(pageId)
  }

  whatDisinfectantFieldError() {
    return super.getErrorElement(pageId)
  }

  whatDisinfectantErrorLink() {
    return super.getErrorLink(pageId)
  }

  async verifyDisinfectantGovLink() {
    await page.validateHrefOfElement(
      this.disinfectantGovLink,
      'http://disinfectants.defra.gov.uk/DisinfectantsExternal/Default.aspx?Module=ApprovalsList_SI'
    )
  }

  async inputDisinfectantAndContinue(text, newPage) {
    await page.typeIntoElement(this.whatDisinfectantInput(), text)
    await super.selectContinue()
    if (newPage) {
      await page.waitForPagePath(newPage.pagePath)
    }
  }

  async disinfectantErrorTest(textInput, errorMessage) {
    await this.inputDisinfectantAndContinue(textInput)
    await super.verifyErrorsOnPage(
      this.whatDisinfectantFieldError(),
      errorMessage
    )
    await super.verifySummaryErrorLink(
      this.whatDisinfectantErrorLink(),
      this.whatDisinfectantInput()
    )
    const inputValue = await this.whatDisinfectantInput().getValue()
    expect(inputValue).toBe(textInput)
  }
}

export default new DisinfectantPage()
