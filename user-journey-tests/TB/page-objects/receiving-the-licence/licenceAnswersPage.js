import { AnswersBasePage } from '../base-pages/answersBasePage.js'

const pageHeadingAndTitle =
  'Check your answers before you continue your application'

class LicenceCheckAnswersPage extends AnswersBasePage {
  pagePath = 'receiving-the-licence/check-answers'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  changeLinks = {
    name: '[data-testid="fullName-change-link"]',
    email: '[data-testid="emailAddress-change-link"]',
    yourName: '[data-testid="yourName-change-link"]',
    originEmail: '[data-testid="originEmail-change-link"]',
    destinationEmail: '[data-testid="destinationEmail-change-link"]'
  }
}

export default new LicenceCheckAnswersPage()
