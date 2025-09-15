import { SingleTextInputPage } from '../../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle =
  'What are the maximum number of days needed to move the animals?'

class MaxDaysNeededPage extends SingleTextInputPage {
  constructor() {
    super({
      pageId: 'maximumDaysAnimals',
      noInputError:
        'Enter the maximum number of days needed to move the animals'
    })
  }

  pagePath = 'fmd/movement-details/number-of-days'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new MaxDaysNeededPage()
