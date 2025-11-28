/* eslint-disable lines-between-class-members */
import { SingleTextInputPage } from '../base-pages/singleTextInputPage.js'

const pageId = 'originEmail'
const pageHeadingAndTitle = 'What is the email address for the origin premises?'
const invalidFormatError = 'Enter the email address in a valid format'
const noInputError = 'Enter the email address for the origin premises'

class OriginEmailAddressPage extends SingleTextInputPage {
  constructor() {
    super({ pageId, noInputError, invalidFormatError })
  }

  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
  pagePath = 'receiving-the-licence/origin-email-address'
}

export default new OriginEmailAddressPage()
