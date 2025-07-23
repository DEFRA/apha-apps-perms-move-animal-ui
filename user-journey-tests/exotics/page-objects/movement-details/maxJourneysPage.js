import { SingleTextInputPage } from '../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle =
  'What is the maximum number of journeys you need to move the animals?'

class MaxJourneyPage extends SingleTextInputPage {
  pagePath = 'exotics/movement-details/maximum-number-of-journeys'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'maximumNumberOfJourneys',
      noInputError:
        'Enter the maximum number of journeys you need to move the animals',
      invalidFormatError: 'Enter a whole number'
    })
  }
}

export default new MaxJourneyPage()
