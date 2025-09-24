import { AnswersBasePage } from '../../../base-pages/answersBasePage.js'

export const aboutTheMovementChangeLinks = {
  movementType: '[data-testid="movementActivityType-change-link"]',
  whatIsMoving: '[data-testid="whatIsMoving-change-link"]',
  typeOfAnimal: '[data-testid="typeOfAnimals-change-link"]',
  animalSlaughtered: '[data-testid="animalSlaughtered-change-link"]',
  toSlaughter: '[data-testid="moveToSlaughter-change-link"]',
  numberOfAnimals: '[data-testid="numberOfAnimals-change-link"]',
  slaughteredNumber: '[data-testid="slaughteredNumber-change-link"]',
  currentPurpose: '[data-testid="currentPurposeOfAnimals-change-link"]',
  animalIds: '[data-testid="animalIds-change-link"]',
  slaughterId: '[data-testid="animalIdsSlaughter-change-link"]',
  whatAreYouMoving: '[data-testid="whatAreYouMovingDetails-change-link"]',
  howMuchAreYouMoving: '[data-testid="howMuchAreYouMoving-change-link"]',
  milkMover: '[data-testid="milkWhoIsMoving-change-link"]',
  milkAnimal: '[data-testid="milkAnimal-change-link"]'
}

const pageHeadingAndTitle =
  'Check your answers before you continue your application'

class WhatIsMovingAnswersPage extends AnswersBasePage {
  pagePath = 'fmd/about-the-movement/check-answers'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  changeLinks = aboutTheMovementChangeLinks
}

export default new WhatIsMovingAnswersPage()
