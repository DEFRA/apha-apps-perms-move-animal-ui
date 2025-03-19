import { AnswersBasePage } from '../base-pages/answersBasePage.js'

const pageHeadingAndTitle =
  'Check your answers before you continue your application'

class LicenceCheckAnswersPage extends AnswersBasePage {
  pagePath = 'receiving-the-licence/check-answers'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  changeLinks = {
    name: '[data-testid="fullName-change-link"]',
    receiveMethod: '[data-testid="receiveMethod-change-link"]',
    email: '[data-testid="emailAddress-change-link"]'
  }
}

export default new LicenceCheckAnswersPage()
