import { AnswersBasePage } from '../base-pages/answersBasePage.js'

const pageHeadingAndTitle =
  'Check your answers before you continue your application'

class DestinationAnswersPage extends AnswersBasePage {
  pagePath = 'destination/check-answers'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  changeLinks = {
    destinationType: '[data-testid="destinationType-change-link"]',
    parishNumber: '[data-testid="destinationFarmCph-change-link"]',
    address: '[data-testid="destinationFarmAddress-change-link"]',
    maxAnimals: '[data-testid="howManyAnimals-change-link"]',
    reason: '[data-testid="reasonForMovement-change-link"]',
    restockAnimals: '[data-testid="restockAnimals-change-link"]',
    restockReasons: '[data-testid="restockReasons-change-link"]',
    restockAdditionalInfo: '[data-testid="restockAdditionalInfo-change-link"]',
    additionalInfo: '[data-testid="additionalInfo-change-link"]'
  }
}

export default new DestinationAnswersPage()
