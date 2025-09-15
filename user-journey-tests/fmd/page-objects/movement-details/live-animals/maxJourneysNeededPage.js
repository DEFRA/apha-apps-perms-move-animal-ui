import { SingleTextInputPage } from '../../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle =
  'What are the maximum number of journeys or consignments needed to move the animals?'

class MaxJourneysNeededPage extends SingleTextInputPage {
  constructor() {
    super({
      pageId: 'maxJourneys',
      noInputError:
        'Enter the maximum of journeys or consignments needed to move the animals'
    })
  }

  pagePath = 'fmd/movement-details/number-of-journeys'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new MaxJourneysNeededPage()
