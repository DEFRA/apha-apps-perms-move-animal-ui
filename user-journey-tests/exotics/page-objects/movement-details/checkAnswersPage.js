import { AnswersBasePage } from '../../../base-pages/answersBasePage.js'

const pageHeadingAndTitle =
  'Check your answers before you continue your application'

class MovementDetailsAnswersPage extends AnswersBasePage {
  pagePath = 'exotics/movement-details/check-answers'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  changeLinks = {
    reason: '[data-testid="reason-change-link"]',
    maximumNumberOfJourneys:
      '[data-testid="maximumNumberOfJourneys-change-link"]',
    isDurationMoreThanOneDay:
      '[data-testid="isDurationMoreThanOneDay-change-link"]',
    multipleDates: '[data-testid="multipleDates-change-link"]',
    date: '[data-testid="date-change-link"]'
  }
}

export default new MovementDetailsAnswersPage()
