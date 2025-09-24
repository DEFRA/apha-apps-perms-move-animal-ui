import { SingleTextInputPage } from '../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle =
  'What are the identification (ID) numbers for the animals being slaughtered?'

class SlaughterIdPage extends SingleTextInputPage {
  constructor() {
    super({
      pageId: 'animalIdsSlaughter',
      noInputError: "Enter the animal ID numbers or N/A if there aren't any"
    })
  }

  pagePath = 'fmd/about-the-movement-or-activity/ID-number-slaughter'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new SlaughterIdPage()
