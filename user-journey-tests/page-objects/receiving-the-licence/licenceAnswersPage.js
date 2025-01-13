import { Page } from '../page.js'

const pageHeadingAndTitle =
  'Check your answers before you continue your application'

class LicenceAnswersPage extends Page {
  pagePath = '/receiving-the-licence/check-answers'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  // Change links
  get changeNameLink() {
    return $('[data-testid="fullName-change-link"]')
  }

  get changeMethodLink() {
    return $('[data-testid="receiveMethod-change-link"]')
  }

  get changeEmailLink() {
    return $('[data-testid="emailAddress-change-link"]')
  }

  // Answer values
  get nameValue() {
    return $$('.govuk-summary-list__value')[0]
  }

  get receiveMethodValue() {
    return $$('.govuk-summary-list__value')[1]
  }

  get emailValue() {
    return $$('.govuk-summary-list__value')[2]
  }
}

export default new LicenceAnswersPage()
