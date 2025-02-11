import { Page } from '../page.js'

const pageId = 'roadsAndTracks'

const pageHeadingAndTitle =
  'Will the incoming cattle come into contact with any roads or tracks used by the existing cattle?'

class RoadsAndTracksPage extends Page {
  pagePath = 'biosecurity/roads-and-tracks'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
  RoadsAndTracksError =
    'Select if the incoming cattle come into contact with any roads or tracks used by the existing cattle'

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

  async roadsAndTracksErrorTest() {
    await super.selectContinue()
    await super.verifyErrorsOnPage(
      this.radioFieldError(),
      this.RoadsAndTracksError
    )
    await super.verifySummaryErrorLink(this.summaryErrorLink(), this.yesRadio)
  }
}

export default new RoadsAndTracksPage()
