import { waitForPagePath } from '../../helpers/page.js'
import { Page } from '../page.js'

const pageId = 'grazing'

const pageHeadingAndTitle = 'Will the incoming cattle be grazed?'

class GrazingPage extends Page {
  pagePath = 'biosecurity/grazing'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
  grazingPageError = 'Select yes if the incoming cattle will be grazed'

  get yesRadio() {
    return $(`#${pageId}`)
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

  async grazingErrorTest() {
    await super.selectContinue()
    await super.verifyErrorsOnPage(
      this.radioFieldError(),
      this.grazingPageError
    )
    await super.verifySummaryErrorLink(this.summaryErrorLink(), this.yesRadio)
  }
}

export default new GrazingPage()
