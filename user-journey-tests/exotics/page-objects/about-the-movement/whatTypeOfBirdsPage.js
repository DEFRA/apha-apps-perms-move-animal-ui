import { RadioButtonBasePage } from '../../../base-pages/radioButtonBasePage.js'

const pageHeadingAndTitle = 'What type of bird are you moving?'

class TypeOfBirdPage extends RadioButtonBasePage {
  pagePath = 'exotics/about-the-movement/what-is-moving/select-animals/birds'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'typeOfBird',
      noInputError: 'Select what type of bird you are moving',
      valueArray: [
        'chickens',
        'turkeys',
        'ducks',
        'geese',
        'birds-of-prey',
        'racing-pigeons',
        'other'
      ]
    })
  }
}

export default new TypeOfBirdPage()
