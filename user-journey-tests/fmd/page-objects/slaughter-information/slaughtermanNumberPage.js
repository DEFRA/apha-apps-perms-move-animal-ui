import { SingleTextInputPage } from '../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle =
  'What is the contact phone number for the business providing the Slaughterman?'

class SlaughtermanNumberPage extends SingleTextInputPage {
  constructor() {
    super({
      pageId: 'businessPhone',
      noInputError:
        'Enter the contact phone number for the business providing the Slaughterman'
    })
  }

  pagePath = 'fmd/slaughter-information/slaughterman-contact-number'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new SlaughtermanNumberPage()
