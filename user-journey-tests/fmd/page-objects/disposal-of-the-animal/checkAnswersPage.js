import { AnswersBasePage } from '../../../base-pages/answersBasePage.js'

export const animalDisposalChangeLinks = {
  wholeAnimal: '[data-testid="disposalWholeAnimal-change-link"]',
  disposalDate: '[data-testid="disposalDate-change-link"]',
  carcassesDestination: '[data-testid="carcassesDestination-change-link"]',
  animalByProductsDestination:
    '[data-testid="animalByProductsDestination-change-link"]',
  destinationBusinessName:
    '[data-testid="destinationBusinessName-change-link"]',
  destinationContactNumber:
    '[data-testid="destinationContactNumber-change-link"]'
}

const pageHeadingAndTitle =
  'Check your answers before you continue your application'

class CheckAnswersPage extends AnswersBasePage {
  pagePath = 'fmd/disposal-of-the-animal/check-answers'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  changeLinks = animalDisposalChangeLinks
}

export default new CheckAnswersPage()
