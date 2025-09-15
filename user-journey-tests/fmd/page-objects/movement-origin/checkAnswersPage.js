import { AnswersBasePage } from '../../../base-pages/answersBasePage.js'

export const movementOriginChangeLinks = {
  isTLA: '[data-testid="tla-change-link"]',
  valueTLA: '[data-testid="tlaOrTcphNumber-change-link"]',
  premisesType: '[data-testid="premisesType-change-link"]',
  cphNumber: '[data-testid="cphNumber-change-link"]',
  originAddress: '[data-testid="originAddress-change-link"]',
  gridReference: '[data-testid="gridRef-change-link"]',
  animalsKept: '[data-testid="whatAnimals-change-link"]',
  otherClovenHoovedAnimals: '[data-testid="clovenHooved-change-link"]'
}

const pageHeadingAndTitle =
  'Check your answers before you continue your application'

class CheckAnswersPage extends AnswersBasePage {
  pagePath = 'fmd/movement-origin/check-answers'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  changeLinks = movementOriginChangeLinks
}

export default new CheckAnswersPage()
