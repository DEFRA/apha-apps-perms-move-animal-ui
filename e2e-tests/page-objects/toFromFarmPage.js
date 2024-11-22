import { $ } from '@wdio/globals'

import { Page } from '../page-objects/page.js'

class ToFromFarmPage extends Page {
  get urlPath() {
    return 'to-or-from-own-premises'
  }

  get toFromFarmTitle() {
    return 'Are you moving the cattle on or off your farm or premises?'
  }

  get toFromFarmErrorMessage() {
    return 'Select if you are moving cattle on or off your farm'
  }

  get onThefarmRadio() {
    return $('#on-farm-radio')
  }

  get offThefarmRadio() {
    return $('#off-farm-radio')
  }

  get onFarmSummaryErrorLink() {
    return $('[href="#on-farm-radio"]')
  }

  get pageError() {
    return $('#onOffFarm-error')
  }

  async selectOnFarmAndContinue() {
    await super.selectElement(this.onThefarmRadio, true)
    await super.selectContinue()
  }

  async selectOffFarmAndContinue() {
    await super.selectElement(this.offThefarmRadio, true)
    await super.selectContinue()
  }

  async toFromFarmErrorTest(errorMessage) {
    await super.selectContinue()
    await super.verifyErrorsOnPage(this.pageError, errorMessage)
    await super.verifySummaryErrorLink(
      this.onFarmSummaryErrorLink,
      this.onThefarmRadio
    )
  }
}

export default new ToFromFarmPage()
