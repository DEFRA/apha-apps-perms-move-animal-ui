import { SingleTextInputPage } from '../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle =
  'What are the identification (ID) numbers for the animals being moved?'

class AnimalIdPage extends SingleTextInputPage {
  constructor() {
    super({
      pageId: 'animalIds',
      noInputError: "Enter the animal ID numbers or N/A if there aren't any"
    })
  }

  pagePath = 'fmd/about-the-movement-or-activity/ID-number'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new AnimalIdPage()
