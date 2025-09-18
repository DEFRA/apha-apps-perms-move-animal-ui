import { RadioButtonBasePage } from '../../../base-pages/radioButtonBasePage.js'

const pageHeadingAndTitle = 'What animal is the milk or product from?'

class AnimalTypeMilkPage extends RadioButtonBasePage {
  pagePath = 'fmd/about-the-movement-or-activity/animal-the-milk-is-from'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'milkAnimal',
      noInputError: 'Select what animal the milk or product is from',
      valueArray: ['cow', 'sheep', 'goat', 'another']
    })
  }
}

export default new AnimalTypeMilkPage()
