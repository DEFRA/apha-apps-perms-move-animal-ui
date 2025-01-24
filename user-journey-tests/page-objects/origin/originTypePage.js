import { $ } from '@wdio/globals'

import { Page } from '../page.js'

const pageHeadingAndTitle = 'What type of premises are the animals moving off?'

class OriginTypePage extends Page {
  pagePath = 'origin/type-of-origin'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
  emptyErrorMessage = 'Select where the animals are moving from'

  get tbRestrictedFarmRadio() {
    return $('#originType')
  }

  get approvedFinishingUnitRadio() {
    return $('#afu')
  }

  get anotherTypeOfPremisesRadio() {
    return $('#other')
  }

  get errorLink() {
    return $('[href="#originType"]')
  }

  get pageError() {
    return $('#originType-error')
  }

  async selectTBRestrictedFarmAndContinue() {
    await super.selectRadioAndContinue(this.tbRestrictedFarmRadio)
  }

  async selectApprovedFinishingUnitAndContinue() {
    await super.selectRadioAndContinue(this.approvedFinishingUnitRadio)
  }

  async selectAnotherTypeOfPremisesAndContinue() {
    await super.selectRadioAndContinue(this.anotherTypeOfPremisesRadio)
  }

  async originTypeErrorTest() {
    await super.selectContinue()
    await super.verifyErrorsOnPage(this.pageError, this.emptyErrorMessage)
    await super.verifySummaryErrorLink(
      this.errorLink,
      this.tbRestrictedFarmRadio
    )
  }
}

export default new OriginTypePage()
