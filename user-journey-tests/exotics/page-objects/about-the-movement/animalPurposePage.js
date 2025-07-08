import { SingleTextInputPage } from '../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle = 'What is the current use or purpose of the animals?'

class AnimalPurposePage extends SingleTextInputPage {
  constructor() {
    super({
      pageId: 'currentPurposeOfAnimals',
      noInputError: 'Enter the current use or purpose of the animals'
    })
  }

  pagePath = 'exotics/about-the-movement/what-is-moving/purpose'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new AnimalPurposePage()
