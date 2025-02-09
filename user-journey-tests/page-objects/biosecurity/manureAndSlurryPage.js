import { Page } from '../page.js'

const pageId = 'manureAndSlurry'

const pageHeadingAndTitle =
  'Has any manure or slurry been put on the grazing field in the past 60 days?'

class ManureAndSlurryPage extends Page {
  pagePath = 'biosecurity/manure-and-slurry'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
  manureOrSlurryPageError =
    'Select if manure or slurry has been put on the grazing field in the past 60 days'

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
      this.manureOrSlurryPageError
    )
    await super.verifySummaryErrorLink(this.summaryErrorLink(), this.yesRadio)
  }
}

export default new ManureAndSlurryPage()
