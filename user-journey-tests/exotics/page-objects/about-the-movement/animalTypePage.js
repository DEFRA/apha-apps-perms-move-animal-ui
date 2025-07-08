import { RadioButtonBasePage } from '../../../base-pages/radioButtonBasePage.js'

const pageHeadingAndTitle = 'Which type of animal are you moving?'

class TypeOfAnimalPage extends RadioButtonBasePage {
  pagePath = 'exotics/about-the-movement/what-is-moving/select-animals'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'typeOfAnimal',
      noInputError: 'Select the type of animal you are moving',
      valueArray: [
        'cattle',
        'sheep-and-goats',
        'pigs',
        'birds',
        'horses',
        'camelids',
        'other'
      ]
    })
  }
}

export default new TypeOfAnimalPage()
