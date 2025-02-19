import { Page } from '../page.js'

const pageHeadingAndTitle =
  'Check your answers before you continue your application'

class IdentificationAnswersPage extends Page {
  pagePath = 'identification/check-answers'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  get earTagsChangeLink() {
    return $('[data-testid="earTags-change-link"]')
  }

  get earTagsValue() {
    return $$('.govuk-summary-list__value')[0]
  }
}

export default new IdentificationAnswersPage()
