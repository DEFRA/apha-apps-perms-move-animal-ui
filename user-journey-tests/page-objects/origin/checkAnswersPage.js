import { Page } from '../page.js'

const pageHeadingAndTitle =
  'Check your answers before you continue your application'

const keyElementFromChangeLink = (element) =>
  element.parentElement().parentElement().$('.govuk-summary-list__key')

const valueElementFromChangeLink = (element) =>
  element.parentElement().parentElement().$('.govuk-summary-list__value')

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
    return valueElementFromChangeLink(this.changeOnOrOffLink)
  }

  get originTypeValue() {
    return valueElementFromChangeLink(this.changeOriginTypeLink)
  }

  get parishNumberValue() {
    return valueElementFromChangeLink(this.changeParishNumberLink)
  }

  get addressValue() {
    return valueElementFromChangeLink(this.changeAddressLink)
  }

  // Question values
  get onOffFarmQuestion() {
    return keyElementFromChangeLink(this.changeOnOrOffLink)
  }

  get originTypeQuestion() {
    return keyElementFromChangeLink(this.changeOriginTypeLink)
  }

  get parishNumberQuestion() {
    return keyElementFromChangeLink(this.changeParishNumberLink)
  }

  get addressQuestion() {
    return keyElementFromChangeLink(this.changeAddressLink)
  }
}

export default new OriginCheckAnswersPage()
