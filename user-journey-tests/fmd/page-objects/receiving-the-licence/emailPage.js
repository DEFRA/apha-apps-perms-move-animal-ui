/* eslint-disable lines-between-class-members */
import { SingleTextInputPage } from '../../../base-pages/singleTextInputPage.js'

const pageId = 'emailAddress'
const pageHeadingAndTitle =
  'What email address would you like the licence sent to?'
const invalidFormatError =
  'Enter an email address in the correct format, like name@example.com'
const noInputError =
  'Enter the email address you would like the licence sent to'

class EmailPage extends SingleTextInputPage {
  constructor() {
    super({ pageId, noInputError, invalidFormatError })
  }

  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
  pagePath = 'fmd/receiving-the-licence/email-address'
}

export default new EmailPage()
