import { AnswersBasePage } from '../../../base-pages/answersBasePage.js'

export const slaughterInfoChangeLinks = {
  slaughterOrKnackerman: '[data-testid="slaughterOrKnackerman-change-link"]',
  knackermanBusinessName: '[data-testid="businessNameKnackerman-change-link"]',
  knackermanContactNumber: '[data-testid="numberKnackerman-change-link"]',
  slaughtermanName: '[data-testid="slaughtermanName-change-link"]',
  businessPhone: '[data-testid="businessPhone-change-link"]',
  slaughterDate: '[data-testid="slaughterDate-change-link"]'
}

const pageHeadingAndTitle =
  'Check your answers before you continue your application'

class CheckAnswersPage extends AnswersBasePage {
  pagePath = 'fmd/slaughter-information/check-answers'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  changeLinks = slaughterInfoChangeLinks
}

export default new CheckAnswersPage()
