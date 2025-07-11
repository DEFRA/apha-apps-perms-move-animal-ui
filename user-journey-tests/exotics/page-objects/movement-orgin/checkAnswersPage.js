import { AnswersBasePage } from '../../../base-pages/answersBasePage.js'

const pageHeadingAndTitle =
  'Check your answers before you continue your application'

class AnimalLocationAnswersPage extends AnswersBasePage {
  pagePath = 'exotics/movement-origin/check-answers'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  changeLinks = {
    typeOfAnimalLocation: '[data-testid="typeOfAnimalLocation-change-link"]',
    typeOfAnimalLocationOther:
      '[data-testid="typeOfAnimalLocationOther-change-link"]',
    animalLocationHasACphNumber:
      '[data-testid="animalLocationHasACphNumber-change-link"]',
    animalLocationCphNumber:
      '[data-testid="animalLocationCphNumber-change-link"]',
    address: '[data-testid="address-change-link"]',
    areInField: '[data-testid="areInField-change-link"]',
    fieldParcelNumber: '[data-testid="fieldParcelNumber-change-link"]',
    isDesignatedPremises: '[data-testid="isDesignatedPremises-change-link"]',
    animalsOnPremises: '[data-testid="animalsOnPremises-change-link"]',
    typeOfProductLocation: '[data-testid="typeOfProductLocation-change-link"]',
    productLocationHasACphNumber:
      '[data-testid="productLocationHasACphNumber-change-link"]',
    productLocationCphNumber:
      '[data-testid="productLocationCphNumber-change-link"]'
  }
}

export default new AnimalLocationAnswersPage()
