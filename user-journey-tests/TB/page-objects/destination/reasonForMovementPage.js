import { waitForPagePath } from '../../helpers/page.js'
import { AddressBasePage } from '../base-pages/addressBasePage.js'

const pageHeadingAndTitle = 'What is the reason for the movement?'

class ReasonForMovementPage extends AddressBasePage {
  pagePath = 'destination/reason-for-movement'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
  toFromFarmErrorMessage = 'Select the reason for movement'

  get routineRestockingRadio() {
    return $('input[value="routineRestocking"]')
  }

  get breedingMaleRadio() {
    return $('input[value="breedingMale"]')
  }

  get welfareRadio() {
    return $('input[value="welfare"]')
  }

  get otherRadio() {
    return $('input[value="other"]')
  }

  get pageError() {
    return $('#reasonForMovement-error')
  }

  async selectRestockingAndContinue(nextPage) {
    await super.selectRadioAndContinue(this.routineRestockingRadio)
    await waitForPagePath(nextPage.pagePath)
  }

  async selectBreedingMaleAndContinue(nextPage) {
    await super.selectRadioAndContinue(this.breedingMaleRadio)
    await waitForPagePath(nextPage.pagePath)
  }

  async selectWelfareAndContinue(nextPage) {
    await super.selectRadioAndContinue(this.welfareRadio)
    await waitForPagePath(nextPage.pagePath)
  }

  async selectOtherAndContinue(nextPage) {
    await super.selectRadioAndContinue(this.otherRadio)
    await waitForPagePath(nextPage.pagePath)
  }
}

export default new ReasonForMovementPage()
