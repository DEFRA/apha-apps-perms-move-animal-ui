import { Page } from '../page.js'

const pageHeadingAndTitle =
  'Check your answers before you continue your application'

class OriginCheckAnswersPage extends Page {
  pagePath = 'origin/summary'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  // Change links
  get changeOnOrOffLink() {
    return $('[data-testid="onOffFarm-change-link"]')
  }

  get changeParishNumberLink() {
    return $('[data-testid="cphNumber-change-link"]')
  }

  get changeAddressLink() {
    return $('[data-testid="address-change-link"]')
  }

  // Answer values
  get onOffFarmValue() {
    return $$('.govuk-summary-list__value')[0]
  }

  get parishNumberValue() {
    return $$('.govuk-summary-list__value')[1]
  }

  get addressValue() {
    return $$('.govuk-summary-list__value')[2]
  }
}

export default new OriginCheckAnswersPage()
