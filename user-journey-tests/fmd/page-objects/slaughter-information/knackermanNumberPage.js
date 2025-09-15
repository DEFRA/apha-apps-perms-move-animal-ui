import { SingleTextInputPage } from '../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle =
  'What is the contact phone number for the business providing the Knackerman?'

class KnackermanNumberPage extends SingleTextInputPage {
  constructor() {
    super({
      pageId: 'numberKnackerman',
      noInputError:
        'Enter the contact phone number for the business providing the Knackerman'
    })
  }

  pagePath = 'fmd/slaughter-information/knackerman-contact-number'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new KnackermanNumberPage()
