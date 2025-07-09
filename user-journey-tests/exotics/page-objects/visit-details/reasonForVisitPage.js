import { SingleTextInputPage } from '../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle = 'What is the reason for the visit?'

class ReasonForVisitPage extends SingleTextInputPage {
  constructor() {
    super({
      pageId: 'reason',
      noInputError: 'Enter the reason for the visit'
    })
  }

  pagePath = 'exotics/visit-details/reason'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new ReasonForVisitPage()
