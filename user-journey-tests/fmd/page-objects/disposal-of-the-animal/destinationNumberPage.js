import { SingleTextInputPage } from '../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle =
  'What is the contact phone number for the destination business?'

class DestinationNumberPage extends SingleTextInputPage {
  constructor() {
    super({
      pageId: 'destinationContactNumber',
      noInputError: "Enter the destination's contact number"
    })
  }

  pagePath = 'fmd/disposal-of-animals/destination-contact-number'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new DestinationNumberPage()
