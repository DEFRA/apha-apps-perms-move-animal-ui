import { waitForPagePath } from '../../helpers/page.js'
import { Page } from '../page.js'

const pageHeadingAndTitle =
  'Will you separate the incoming cattle from the resident herd?'

const pageId = 'keptSeparately'

class KeptSeparatelyPage extends Page {
  pagePath = 'biosecurity/kept-separately'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
  keptSeparatelySelectionError =
    'Select if the incoming cattle will be kept separately'

  get yesRadio() {
    return $('#keptSeparately')
  }

  get noRadio() {
    return $('#no')
  }

  radioFieldError() {
    return super.getErrorElement(pageId)
  }

  summaryErrorLink() {
    return super.getErrorLink(pageId)
  }

  async selectYesAndContinue(newPage) {
    await super.selectRadioAndContinue(this.yesRadio)
    await waitForPagePath(newPage.pagePath)
  }

  async selectNoAndContinue(newPage) {
    await super.selectRadioAndContinue(this.noRadio)
    await waitForPagePath(newPage.pagePath)
  }

  async keptSeparatelySelectionErrorTest() {
    await super.selectContinue()
    await super.verifyErrorsOnPage(
      this.radioFieldError(),
      this.keptSeparatelySelectionError
    )
    await super.verifySummaryErrorLink(this.summaryErrorLink(), this.yesRadio)
  }
}

export default new KeptSeparatelyPage()
