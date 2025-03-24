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
    maxAnimals: '[data-testid="howManyAnimalsMaximum-change-link"]',
    reason: '[data-testid="reasonForMovement-change-link"]',
    additionalInfo: '[data-testid="additionalInfo-change-link"]',
    over75: '[data-testid="movingMoreThan75Animals-change-link"]',
    halfHerd: '[data-testid="movingMoreThanHalfExistingHerd-change-link"]'
  }
}

export default new DestinationAnswersPage()
