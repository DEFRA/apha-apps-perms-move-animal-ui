import { AnswersBasePage } from '../../../base-pages/answersBasePage.js'

export const movementDetailsChangeLinks = {
  reason: '[data-testid="reason-change-link"]',
  frequency: '[data-testid="frequency-change-link"]',
  maximumNumberOfJourneys:
    '[data-testid="maximumNumberOfJourneys-change-link"]',
  isDurationMoreThanOneDay:
    '[data-testid="isDurationMoreThanOneDay-change-link"]',
  multipleDates: '[data-testid="multipleDates-change-link"]',
  date: '[data-testid="date-change-link"]'
}

const pageHeadingAndTitle =
  'Check your answers before you continue your application'

class MovementDetailsAnswersPage extends AnswersBasePage {
  pagePath = 'exotics/movement-details/check-answers'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  changeLinks = movementDetailsChangeLinks
}

export default new MovementDetailsAnswersPage()
