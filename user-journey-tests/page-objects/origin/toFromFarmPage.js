import { $ } from '@wdio/globals'

import { Page } from '../page.js'
import { waitForPagePath } from '../../helpers/page.js'

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
    return $('#off')
  }

  get onFarmSummaryErrorLink() {
    return $('[href="#onOffFarm"]')
  }

  get pageError() {
    return $('#onOffFarm-error')
  }

  async selectOnFarmAndContinue(nextPage) {
    await super.selectRadioAndContinue(this.onThefarmRadio)
    await waitForPagePath(nextPage.pagePath)
  }

  async selectOffFarmAndContinue(nextPage) {
    await super.selectRadioAndContinue(this.offThefarmRadio)
    await waitForPagePath(nextPage.pagePath)
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
