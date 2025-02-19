import { Page } from '../page.js'
import * as page from '../../helpers/page.js'

const pageId = 'dilutionRate'

const pageHeadingAndTitle =
  'What dilution rate are you using for your disinfectant?'

class DisinfectantDilutionPage extends Page {
  pagePath = 'biosecurity/disinfectant-dilution'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle

  noInputError = 'Enter the dilution rate'
  invalidInputError = 'Enter a number'

  get dilutionGovLink() {
    return $('a*=disinfectants approved for use in England')
  }

  dilutionInput() {
    return super.getInputField(pageId)
  }

  dilutionFieldError() {
    return super.getErrorElement(pageId)
  }

  dilutionErrorLink() {
    return super.getErrorLink(pageId)
  }

  async verifyDilutionGovLink() {
    await page.validateHrefOfElement(
      this.dilutionGovLink,
      'http://disinfectants.defra.gov.uk/DisinfectantsExternal/Default.aspx?Module=ApprovalsList_SI'
    )
  }

  async inputDilutionAndContinue(text, newPage) {
    await page.typeIntoElement(this.dilutionInput(), text)
    await super.selectContinue()
    if (newPage) {
      await page.waitForPagePath(newPage.pagePath)
    }
  }

  async dilutionErrorTest(textInput, errorMessage) {
    await this.inputDilutionAndContinue(textInput)
    await super.verifyErrorsOnPage(this.dilutionFieldError(), errorMessage)
    await super.verifySummaryErrorLink(
      this.dilutionErrorLink(),
      this.dilutionInput()
    )
    const inputValue = await this.dilutionInput().getValue()
    expect(inputValue).toBe(textInput)
  }
}

export default new DisinfectantDilutionPage()
