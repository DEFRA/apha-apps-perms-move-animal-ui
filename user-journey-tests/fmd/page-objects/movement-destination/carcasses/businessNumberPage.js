import { SingleTextInputPage } from '../../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle =
  'What is the contact phone number for the destination business?'

class BusinessNumberPage extends SingleTextInputPage {
  constructor() {
    super({
      pageId: 'destinationBusinessPhone',
      noInputError: 'Enter the contact number for the destination business'
    })
  }

  pagePath = 'fmd/movement-destination/contact-number'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new BusinessNumberPage()
