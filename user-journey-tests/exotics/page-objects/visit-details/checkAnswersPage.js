import { AnswersBasePage } from '../../../base-pages/answersBasePage.js'

export const visitDetailsChangeLinks = {
  reason: '[data-testid="reason-change-link"]',
  isDurationMoreThanOneDay:
    '[data-testid="isDurationMoreThanOneDay-change-link"]',
  multipleDates: '[data-testid="multipleDates-change-link"]'
}

const pageHeadingAndTitle =
  'Check your answers before you continue your application'

class VisitDetailsAnswersPage extends AnswersBasePage {
  pagePath = 'exotics/visit-details/check-answers'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  changeLinks = visitDetailsChangeLinks
}

export default new VisitDetailsAnswersPage()
