import { AnswersBasePage } from '../../../base-pages/answersBasePage.js'

export const movementDetailsChangeLinks = {
  maximumDaysAnimals: '[data-testid="maximumDaysAnimals-change-link"]',
  maxJourneys: '[data-testid="maxJourneys-change-link"]',
  movementStart: '[data-testid="movementStart-change-link"]',
  movementEnd: '[data-testid="movementEnd-change-link"]',
  disposalDate: '[data-testid="disposalDate-change-link"]',
  twoWeekRepeat: '[data-testid="twoWeekRepeat-change-link"]',
  expectMovementDate: '[data-testid="expectMovementDate-change-link"]'
}

const pageHeadingAndTitle =
  'Check your answers before you continue your application'

class CheckAnswersPage extends AnswersBasePage {
  pagePath = 'fmd/movement-details/check-answers'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  changeLinks = movementOriginChangeLinks
}

export default new CheckAnswersPage()
