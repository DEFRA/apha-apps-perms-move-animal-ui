import { Page } from '../page.js'

const pageHeadingAndTitle =
  'Check your answers before you continue your application'

class LicenceAnswersPage extends Page {
  pagePath = '/receiving-the-licence/check-answers'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  // Change links
  get changeEmailLink() {
    return $('[data-testid="emailAddress-change-link"]')
  }

  // Answer values

  get receiveMethodValue() {
    return $$('.govuk-summary-list__value')[0]
  }

  get emailValue() {
    return $$('.govuk-summary-list__value')[1]
  }
}

export default new LicenceAnswersPage()
