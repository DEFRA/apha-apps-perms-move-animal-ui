import { Page } from '../page.js'

const pageHeadingAndTitle =
  'Check your answers before you continue your application'

class OriginCheckAnswersPage extends Page {
  pagePath = 'origin/check-answers'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  // Change links
  get changeOnOrOffLink() {
    return $('[data-testid="onOffFarm-change-link"]')
  }

  get changeOriginTypeLink() {
    return $('[data-testid="originType-change-link"]')
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

  get originTypeValue() {
    return $$('.govuk-summary-list__value')[1]
  }

  get parishNumberValue() {
    return $$('.govuk-summary-list__value')[2]
  }

  get addressValue() {
    return $$('.govuk-summary-list__value')[3]
  }

  // Question values
  get onOffFarmQuestion() {
    return $$('.govuk-summary-list__key')[0]
  }

  get originTypeQuestion() {
    return $$('.govuk-summary-list__key')[1]
  }

  get parishNumberQuestion() {
    return $$('.govuk-summary-list__key')[2]
  }

  get addressQuestion() {
    return $$('.govuk-summary-list__key')[3]
  }
}

export default new OriginCheckAnswersPage()
