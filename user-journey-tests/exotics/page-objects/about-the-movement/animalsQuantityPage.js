import { SingleTextInputPage } from '../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle = 'How many animals are you planning to move?'

class NumberOfAnimalsPage extends SingleTextInputPage {
  pagePath = 'exotics/about-the-movement/what-is-moving/select-animals/quantity'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'numberOfAnimals',
      noInputError: 'Enter how many animals you are planning to move',
      invalidFormatError: 'Enter a whole number'
    })
  }
}

export default new NumberOfAnimalsPage()
