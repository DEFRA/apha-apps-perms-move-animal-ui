import { $ } from '@wdio/globals'

import { Page } from '../page.js'

const pageHeadingAndTitle =
  'Are you moving the animals on or off your farm or premises?'

class ToFromFarmPage extends Page {
  pagePath = 'origin/to-or-from-own-premises'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
  toFromFarmErrorMessage = 'Select if you are moving cattle on or off your farm'

  get onThefarmRadio() {
    return $('#onOffFarm')
  }

  get offThefarmRadio() {
    return $('#off-farm-radio')
  }

  get onFarmSummaryErrorLink() {
    return $('[href="#onOffFarm"]')
  }

  get pageError() {
    return $('#onOffFarm-error')
  }

  async selectOnFarmAndContinue() {
    await super.selectRadioAndContinue(this.onThefarmRadio)
  }

  async selectOffFarmAndContinue() {
    await super.selectRadioAndContinue(this.offThefarmRadio)
  }

  async toFromFarmErrorTest() {
    await super.selectContinue()
    await super.verifyErrorsOnPage(this.pageError, this.toFromFarmErrorMessage)
    await super.verifySummaryErrorLink(
      this.onFarmSummaryErrorLink,
      this.onThefarmRadio
    )
  }
}

export default new ToFromFarmPage()
