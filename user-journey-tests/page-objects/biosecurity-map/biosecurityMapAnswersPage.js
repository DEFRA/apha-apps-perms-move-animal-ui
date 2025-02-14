import { Page } from '../page.js'

const pageHeadingAndTitle =
  'Check your answers before you continue your application'

class BiosecurityMapAnswersPage extends Page {
  pagePath = 'biosecurity-map/check-answers'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  get biosecMapChangeLink() {
    return $('[data-testid="upload-plan-change-link"]')
  }

  get biosecMapValue() {
    return $$('.govuk-summary-list__value')[0]
  }
}

export default new BiosecurityMapAnswersPage()
