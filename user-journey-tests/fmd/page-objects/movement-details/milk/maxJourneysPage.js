import { SingleTextInputPage } from '../../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle =
  'What are the maximum number of journeys needed to move the milk over the 2 week period?'

class MaxJourneysNeededPage extends SingleTextInputPage {
  constructor() {
    super({
      pageId: 'maximumJourneysMilk',
      noInputError:
        'Enter the maximum number of journeys needed to move the milk in the 2 week period'
    })
  }

  pagePath = 'fmd/movement-details/milk-maximum-journeys'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new MaxJourneysNeededPage()
