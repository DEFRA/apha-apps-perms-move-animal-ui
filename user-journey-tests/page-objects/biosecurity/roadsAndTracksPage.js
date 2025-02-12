import { waitForPagePath } from '../../helpers/page.js'
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

  async selectYesAndContinue(newPage) {
    await super.selectRadioAndContinue(this.yesRadio)
    await waitForPagePath(newPage.pagePath)
  }

  async selectNoAndContinue(newPage) {
    await super.selectRadioAndContinue(this.noRadio)
    await waitForPagePath(newPage.pagePath)
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
