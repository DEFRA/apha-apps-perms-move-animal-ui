import { AnswersBasePage } from '../base-pages/answersBasePage.js'

const pageHeadingAndTitle =
  'Check your answers before you continue your application'
const changeLinks = {
  name: '[data-testid="fullName-change-link"]',
  receiveMethod: '[data-testid="receiveMethod-change-link"]',
  email: '[data-testid="emailAddress-change-link"]'
}

class LicenceCheckAnswersPage extends AnswersBasePage {
  pagePath = '/receiving-the-licence/check-answers'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super(changeLinks)
  }
}

export default new LicenceCheckAnswersPage()
