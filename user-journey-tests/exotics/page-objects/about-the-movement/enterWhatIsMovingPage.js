import { SingleTextInputPage } from '../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle = 'What are you moving?'

class EnterWhatIsMovingPage extends SingleTextInputPage {
  constructor() {
    super({
      pageId: 'whatAreYouMovingDetails',
      noInputError: 'Enter information about what you are moving'
    })
  }

  pagePath = 'exotics/about-the-movement/what-is-moving/enter-what-is-moving'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export { EnterWhatIsMovingPage }
