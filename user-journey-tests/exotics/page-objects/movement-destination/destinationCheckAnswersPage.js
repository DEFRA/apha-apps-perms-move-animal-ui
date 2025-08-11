import { AnswersBasePage } from '../../../base-pages/answersBasePage.js'

export const movementDestinationChangeLinks = {
  typeOfLocation: '[data-testid="typeOfLocation-change-link"]',
  address: '[data-testid="address-change-link"]',
  cphNumberKnown: '[data-testid="cphNumberKnown-change-link"]',
  cphNumber: '[data-testid="cphNumber-change-link"]',
  responsiblePersonName: '[data-testid="responsiblePersonName-change-link"]'
}

const pageHeadingAndTitle =
  'Check your answers before you continue your application'

class DestinationCheckAnswersPage extends AnswersBasePage {
  pagePath = 'exotics/movement-destination/check-answers'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  changeLinks = movementDestinationChangeLinks
}

export default new DestinationCheckAnswersPage()
