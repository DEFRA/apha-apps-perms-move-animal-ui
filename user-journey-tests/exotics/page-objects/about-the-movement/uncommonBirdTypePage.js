import { RadioButtonBasePage } from '../../../base-pages/radioButtonBasePage.js'

const pageHeadingAndTitle = 'What type of bird are you moving?'

class TypeOfUncommonBirdPage extends RadioButtonBasePage {
  pagePath =
    'exotics/about-the-movement/what-is-moving/select-animals/birds/other-birds'

  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'typeOfBirdUncommon',
      noInputError: 'Select what type of bird you are moving',
      valueArray: [
        'avairy-birds',
        'pheasant',
        'partridge',
        'quail',
        'grouse',
        'other'
      ]
    })
  }
}

export default new TypeOfUncommonBirdPage()
