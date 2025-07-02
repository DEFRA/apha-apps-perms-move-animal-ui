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
    earTags: '[data-testid="earTags-change-link"]',
    oldestDOB: '[data-testid="oldestCalfDob-change-link"]',
    earTagsCalves: '[data-testid="earTagsCalves-change-link"]',
    cattleOver42: '[data-testid="animals42DaysOldOrOlder-change-link"]'
  }
}

export default new IdentificationAnswersPage()
