import { SingleTextInputPage } from '../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle = 'What are you moving?'

class DescribeWhatYouAreMovingPage extends SingleTextInputPage {
  constructor() {
    super({
      pageId: 'whatAreYouMovingDescription',
      noInputError: 'Enter information on what you are moving'
    })
  }

  pagePath =
    'exotics/about-the-movement/what-is-moving/enter-what-is-moving/description'

  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new DescribeWhatYouAreMovingPage()
