import { Page } from '../page.js'

const pageHeadingAndTitle = 'Where are the animals going to?'

const pageId = 'destinationType'

class DestinationSelectionPage extends Page {
  pagePath = 'destination/type-of-destination'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
  destinationSelectionError = 'Select where the animals are going'

  get slaughterRadio() {
    return $('#destinationType')
  }

  get dedicatedSaleRadio() {
    return $('#dedicated-sale')
  }

  get approvedFinishingRadio() {
    return $('#afu')
  }

  get otherDestinationRadio() {
    return $('#other')
  }

  radioFieldError() {
    return super.getErrorElement(pageId)
  }

  summaryErrorLink() {
    return super.getErrorLink(pageId)
  }

  async selectSlaughterRadioAndContinue() {
    await super.selectRadioAndContinue(this.slaughterRadio)
  }

  async selectDedicatedSaleAndContinue() {
    await super.selectRadioAndContinue(this.dedicatedSaleRadio)
  }

  async selectApprovedFinishingAndContinue() {
    await super.selectRadioAndContinue(this.approvedFinishingRadio)
  }

  async selectOtherDestinationAndContinue() {
    await super.selectRadioAndContinue(this.otherDestinationRadio)
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
}

export default new DestinationSelectionPage()
