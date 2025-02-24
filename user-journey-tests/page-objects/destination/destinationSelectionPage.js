import { waitForPagePath } from '../../helpers/page.js'
import { Page } from '../page.js'

const pageHeadingAndTitle = 'Where are the animals going to?'

const pageId = 'destinationType'

class DestinationSelectionPage extends Page {
  pagePath = 'destination/type-of-destination'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
  destinationSelectionError = 'Select where the animals are going'

  get slaughterRadio() {
    return $('input[value="slaughter"]')
  }

  get dedicatedSaleRadio() {
    return $('input[value="dedicated-sale"]')
  }

  get approvedFinishingRadio() {
    return $('input[value="afu"]')
  }

  get zooRadio() {
    return $('input[value="zoo"]')
  }

  get labRadio() {
    return $('input[value="lab"]')
  }

  get otherDestinationRadio() {
    return $('input[value="other"]')
  }

  radioFieldError() {
    return super.getErrorElement(pageId)
  }

  summaryErrorLink() {
    return super.getErrorLink(pageId)
  }

  async selectSlaughterRadioAndContinue(nextPage) {
    await super.selectRadioAndContinue(this.slaughterRadio)
    await waitForPagePath(nextPage.pagePath)
  }

  async selectDedicatedSaleAndContinue(nextPage) {
    await super.selectRadioAndContinue(this.dedicatedSaleRadio)
    await waitForPagePath(nextPage.pagePath)
  }

  async selectApprovedFinishingAndContinue(nextPage) {
    await super.selectRadioAndContinue(this.approvedFinishingRadio)
    await waitForPagePath(nextPage.pagePath)
  }

  async selectZooAndContinue(nextPage) {
    await super.selectRadioAndContinue(this.zooRadio)
    await waitForPagePath(nextPage.pagePath)
  }

  async selectLabAndContinue(nextPage) {
    await super.selectRadioAndContinue(this.labRadio)
    await waitForPagePath(nextPage.pagePath)
  }

  async selectOtherDestinationAndContinue(nextPage) {
    await super.selectRadioAndContinue(this.otherDestinationRadio)
    await waitForPagePath(nextPage.pagePath)
  }

  async destinationSelectionErrorTest() {
    await super.selectContinue()
    await super.verifyErrorsOnPage(
      this.radioFieldError(),
      this.destinationSelectionError
    )
    await super.verifySummaryErrorLink(
      this.summaryErrorLink(),
      this.slaughterRadio
    )
  }

  async verifyRadioButtonNumber(expectedCount) {
    const radioButtons = await $$('.govuk-radios__input').length

    expect(radioButtons).toBe(expectedCount)
  }
}

export default new DestinationSelectionPage()
