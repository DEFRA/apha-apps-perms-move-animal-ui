import { AnswersBasePage } from '../../../base-pages/answersBasePage.js'

export const receivingTheLicenceChangeLinks = {
  name: '[data-testid="registeredKeeperName-change-link"]',
  email: '[data-testid="emailAddress-change-link"]'
}

const pageHeadingAndTitle =
  'Check your answers before you continue your application'

class CheckAnswersPage extends AnswersBasePage {
  pagePath = 'exotics/receiving-the-licence/check-answers'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  changeLinks = receivingTheLicenceChangeLinks
}

export default new CheckAnswersPage()
