import { CheckboxBasePage } from '../base-pages/checkboxBasePage.js'

const pageId = 'restockAnimals'
const pageHeadingAndTitle = 'Which types of animals are you restocking?'
const noInputError = 'Select which types of animals you are restocking'

const checkboxIds = [
  'calves',
  'heifers',
  'cows',
  'pregnantCows',
  'dairyCows',
  'sucklingCalves'
]

class AnimalTypesPage extends CheckboxBasePage {
  pagePath = 'destination/restocking-additional-info-animal-type'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      checkboxIds,
      pageId,
      noInputError
    })
  }
}

export default new AnimalTypesPage()
