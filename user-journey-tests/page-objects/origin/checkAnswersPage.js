import { Page } from '../page.js'

class OriginCheckAnswersPage extends Page {
  get pageTitle() {
    return 'Check your answers before you continue your application'
  }

  get checkAnswersUrlPath() {
    return 'origin/summary'
  }

  // Change links
  get changeOnOrOffLink() {
    return $('[data-testid="on-off-change-link"]')
  }

  get changeParishNumberLink() {
    return $('[data-testid="cph-change-link"]')
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
