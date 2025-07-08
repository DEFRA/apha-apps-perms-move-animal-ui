import { SingleTextInputPage } from '../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle = 'What are you moving?'

class HowMuchAreYouMovingPage extends SingleTextInputPage {
  constructor() {
    super({
      pageId: 'How much are you moving?',
      noInputError: 'Enter how much you are moving'
    })
  }

  pagePath =
    'exotics/about-the-movement/what-is-moving/enter-what-is-moving/quantity'

  pageHeading = pageHeadingAndTitle

  pageTitle = pageHeadingAndTitle
}

export default new HowMuchAreYouMovingPage()
