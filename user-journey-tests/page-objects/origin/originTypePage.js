import { $ } from '@wdio/globals'

import { Page } from '../page.js'
import { waitForElement, waitForPagePath } from '../../helpers/page.js'

const pageHeadingAndTitle = 'What type of premises are the animals moving off?'

class OriginTypePage extends Page {
  pagePath = 'origin/type-of-origin'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
  emptyErrorMessage = 'Select where the animals are moving from'

  get marketRadio() {
    return $('input[value="market"]')
  }

  get unrestrictedFarmRadio() {
    return $('#unrestricted-farm')
  }

  get tbRestrictedFarmRadio() {
    return $('[value="tb-restricted-farm"]')
  }

  get unrestrictedFarmRadio() {
    return $('[value="unrestricted-farm"]')
  }

  get approvedFinishingUnitRadio() {
    return $('#afu')
  }

  get zooRadio() {
    return $('#zoo')
  }

  get labRadio() {
    return $('#lab')
  }

  get afterImportRadio() {
    return $('#after-import-location')
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

  async verifyOffFarmVersion() {
    await waitForElement(this.tbRestrictedFarmRadio, { visible: false })
    await waitForElement(this.approvedFinishingUnitRadio, { visible: false })
    await waitForElement(this.unrestrictedFarmRadio, { visible: false })
    await waitForElement(this.zooRadio, { visible: false })
    await waitForElement(this.labRadio, { visible: false })
    await waitForElement(this.anotherTypeOfPremisesRadio, { visible: false })
  }

  async verifyOnFarmVersion() {
    await waitForElement(this.marketRadio, { visible: false })
    await waitForElement(this.afterImportRadio, { visible: false })
    await this.verifyOffFarmVersion()
  }

  async selectTBRestrictedFarmAndContinue(nextPage) {
    await super.selectRadioAndContinue(this.tbRestrictedFarmRadio)
    await waitForPagePath(nextPage.pagePath)
  }

  async selectApprovedFinishingUnitAndContinue(nextPage) {
    await super.selectRadioAndContinue(this.approvedFinishingUnitRadio)
    await waitForPagePath(nextPage.pagePath)
  }

  async selectAnotherTypeOfPremisesAndContinue(nextPage) {
    await super.selectRadioAndContinue(this.anotherTypeOfPremisesRadio)
    await waitForPagePath(nextPage.pagePath)
  }

  async selectMarketAndContinue(nextPage) {
    await super.selectRadioAndContinue(this.marketRadio)
    await waitForPagePath(nextPage.pagePath)
  }

  async selectUnrestrictedPremisesAndContinue(nextPage) {
    await super.selectRadioAndContinue(this.unrestrictedFarmRadio)
    await waitForPagePath(nextPage.pagePath)
  }

  async selectZooAndContinue(nextPage) {
    await super.selectRadioAndContinue(this.zooRadio)
    await waitForPagePath(nextPage.pagePath)
  }

  async selectUnrestrictedAndContinue(nextPage) {
    await super.selectRadioAndContinue(this.unrestrictedFarmRadio)
    await waitForPagePath(nextPage.pagePath)
  }

  async selectLabAndContinue(nextPage) {
    await super.selectRadioAndContinue(this.labRadio)
    await waitForPagePath(nextPage.pagePath)
  }

  async selectAfterImportAndContinue(nextPage) {
    await super.selectRadioAndContinue(this.afterImportRadio)
    await waitForPagePath(nextPage.pagePath)
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
