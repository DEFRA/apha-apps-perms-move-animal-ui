import { Page } from '../page.js'

const pageHeadingAndTitle =
  'Check your answers before you continue your application'

class LicenceAnswersPage extends Page {
  pagePath = '/receiving-the-licence/check-answers'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  // Change links
  get changeEmailLink() {
    return $('[data-testid="email-address-change-link"]')
  }

  // Answer values
  get emailValue() {
    return $$('.govuk-summary-list__value')[0]
  }
}

export default new LicenceAnswersPage()
