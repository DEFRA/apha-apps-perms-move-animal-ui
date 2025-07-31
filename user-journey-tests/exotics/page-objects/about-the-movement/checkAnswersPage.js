import { AnswersBasePage } from '../../../base-pages/answersBasePage.js'

const pageHeadingAndTitle =
  'Check your answers before you continue your application'

class WhatIsMovingAnswersPage extends AnswersBasePage {
  pagePath = 'exotics/about-the-movement/check-answers'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  changeLinks = {
    movementType: '[data-testid="movementType-change-link"]',
    whatIsMoving: '[data-testid="whatIsMoving-change-link"]',
    typeOfAnimal: '[data-testid="typeOfAnimal-change-link"]',
    numberOfAnimals: '[data-testid="numberOfAnimals-change-link"]',
    currentPurpose: '[data-testid="currentPurposeOfAnimals-change-link"]',
    animalIds: '[data-testid="animalsId-change-link"]',
    whatAreYouMoving: '[data-testid="whatAreYouMovingDetails-change-link"]',
    howMuchAreYouMoving: '[data-testid="howMuchAreYouMoving-change-link"]'
  }
}

export default new WhatIsMovingAnswersPage()
