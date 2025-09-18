import { SingleTextInputPage } from '../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle = 'How many animals are you planning to move?'

class AnimalsQuantityPage extends SingleTextInputPage {
  pagePath = 'fmd/about-the-movement-or-activity/number-of-animals'
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

export default new AnimalsQuantityPage()
