import { SingleTextInputPage } from '../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle = 'What is the reason for the movement?'

class ReasonForMovementPage extends SingleTextInputPage {
  constructor() {
    super({
      pageId: 'reason',
      noInputError: 'Enter the reason for the movement'
    })
  }

  pagePath = 'exotics/movement-details/reason'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new ReasonForMovementPage()
