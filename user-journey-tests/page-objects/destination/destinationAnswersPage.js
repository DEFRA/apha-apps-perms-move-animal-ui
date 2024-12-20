import { Page } from '../page.js'

const pageHeadingAndTitle =
  'Check your answers before you continue your application'

class DestinationAnswersPage extends Page {
  pagePath = 'destination/check-answers'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  // Change links
  get changeDestinationLink() {
    return $('[data-testid="destinationType-change-link"]')
  }

  get destiationValue() {
    return $$('.govuk-summary-list__value')[0]
  }
}

export default new DestinationAnswersPage()
