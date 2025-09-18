import { RadioButtonBasePage } from '../../../base-pages/radioButtonBasePage.js'

const pageHeadingAndTitle = 'Which type of animal are you moving?'

class TypeOfAnimalPage extends RadioButtonBasePage {
  pagePath = 'fmd/about-the-movement-or-activity/animal-type'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'typeOfAnimals',
      noInputError: 'Select the type of animal you are moving',
      valueArray: ['cattle', 'sheep', 'goats', 'pigs', 'camelids']
    })
  }
}

export default new TypeOfAnimalPage()
