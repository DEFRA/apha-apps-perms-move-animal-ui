import { RadioButtonBasePage } from '../../../base-pages/radioButtonBasePage.js'

const pageHeadingAndTitle = 'Which type of animal will be slaughtered?'

class AnimalTypeSlaughterPage extends RadioButtonBasePage {
  pagePath = 'fmd/about-the-movement-or-activity/animal-being-slaughtered'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'typeOfAnimal',
      noInputError: 'Select the type of animal being slaughtered',
      valueArray: ['cattle', 'sheep', 'goats', 'pigs', 'camelids']
    })
  }
}

export default new AnimalTypeSlaughterPage()
