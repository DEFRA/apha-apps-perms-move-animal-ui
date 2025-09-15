import { SingleTextInputPage } from '../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle = 'How many animals will be slaughtered?'

class HowMuchAreYouMovingPage extends SingleTextInputPage {
  constructor() {
    super({
      pageId: 'slaughteredNumber',
      noInputError: 'Enter how many animals will be slaughtered'
    })
  }

  pagePath = 'fmd/about-the-movement-or-activity/number-of-animals-slaughtered'

  pageHeading = pageHeadingAndTitle

  pageTitle = pageHeadingAndTitle
}

export default new HowMuchAreYouMovingPage()
