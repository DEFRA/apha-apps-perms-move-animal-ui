import { AnswersBasePage } from '../../../base-pages/answersBasePage.js'

const pageHeadingAndTitle =
  'Check your answers before you continue your application'

class CheckAnswersPage extends AnswersBasePage {
  pagePath = 'exotics/receiving-the-licence/check-answers'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  changeLinks = {
    name: '[data-testid="visitResponsiblePersonName-change-link"]',
    receiveMethod: '[data-testid="emailOrPost-change-link"]',
    email: '[data-testid="email-change-link"]'
  }
}

export default new CheckAnswersPage()
