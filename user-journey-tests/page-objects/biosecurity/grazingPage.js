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

  async selectYesAndContinue() {
    await super.selectRadioAndContinue(this.yesRadio)
  }

  async selectNoAndContinue() {
    await super.selectRadioAndContinue(this.noRadio)
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
