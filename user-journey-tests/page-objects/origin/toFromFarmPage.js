import { $ } from '@wdio/globals'

import { Page } from '../page.js'
import * as page from '../../helpers/page.js'

const pageHeadingAndTitle =
  'Are you moving the cattle on or off your farm or premises?'

class ToFromFarmPage extends Page {
  pagePath = 'origin/to-or-from-own-premises'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  get toFromFarmErrorMessage() {
    return 'Select if you are moving cattle on or off your farm'
  }

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
    await page.selectElement(this.onThefarmRadio, true)
    await super.selectContinue()
  }

  async selectOffFarmAndContinue() {
    await page.selectElement(this.offThefarmRadio, true)
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
