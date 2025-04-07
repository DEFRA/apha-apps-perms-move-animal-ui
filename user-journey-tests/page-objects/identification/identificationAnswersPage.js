import { AnswersBasePage } from '../base-pages/answersBasePage.js'

const pageHeadingAndTitle =
  'Check your answers before you continue your application'

class IdentificationAnswersPage extends AnswersBasePage {
  pagePath = 'identification/check-answers'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  changeLinks = {
    calvesUnder42: '[data-testid="calvesUnder42DaysOld-change-link"]',
    tbTestDates: '[data-testid="testingDates-change-link"]',
    earTags: '[data-testid="earTags-change-link"]'
  }
}

export default new IdentificationAnswersPage()
