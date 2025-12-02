/* eslint-disable lines-between-class-members */
import { SingleTextInputPage } from '../base-pages/singleTextInputPage.js'

const pageId = 'destinationEmail'
const pageHeadingAndTitle = 'What is your email address?'
const invalidFormatError = 'Enter the email address in a valid format'
const noInputError = 'Enter your email address'

class DestinationEmailAddressPage extends SingleTextInputPage {
  constructor() {
    super({ pageId, noInputError, invalidFormatError })
  }

  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
  pagePath = 'receiving-the-licence/destination-email-address'
}

export default new DestinationEmailAddressPage()
