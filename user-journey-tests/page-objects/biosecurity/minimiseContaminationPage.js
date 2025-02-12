import { Page } from '../page.js'
import { waitForPagePath } from '../../helpers/page.js'
import * as page from '../../helpers/page.js'

const pageId = 'buildingsHowMinimiseContamination'

const pageHeadingAndTitle =
  'How will you reduce building and equipment contamination?'

class MinimiseContaminationPage extends Page {
  pagePath = 'biosecurity/buildings-how-minimise-contamination'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle

  noInputError =
    'Enter information about how you will reduce building contamination'

  minimiseContaminationInput() {
    return super.getInputField(pageId)
  }

  minimiseContaminationFieldError() {
    return super.getErrorElement(pageId)
  }

  minimiseContaminationErrorLink() {
    return super.getErrorLink(pageId)
  }

  async inputMinimiseContaminationAndContinue(text, newPage) {
    await page.typeIntoElement(this.minimiseContaminationInput(), text)
    await super.selectContinue()
    if (newPage) {
      await waitForPagePath(newPage.pagePath)
    }
  }

  async minimiseContaminationErrorTest(textInput, errorMessage) {
    await this.inputMinimiseContaminationAndContinue(textInput)
    await super.verifyErrorsOnPage(
      this.minimiseContaminationFieldError(),
      errorMessage
    )
    await super.verifySummaryErrorLink(
      this.minimiseContaminationErrorLink(),
      this.minimiseContaminationInput()
    )
    const inputValue = await this.minimiseContaminationInput().getValue()
    expect(inputValue).toBe(textInput)
  }
}

export default new MinimiseContaminationPage()
