import { DoubleTextInputPage } from '../base-pages/doubleTextInputPage.js'

const firstId = 'firstName'
const lastId = 'lastName'
const pageHeadingAndTitle =
  'What is the name of the registered owner of the cattle?'
const input1Error = 'Enter the first name of the registered owner of the cattle'
const input2Error = 'Enter the last name of the registered owner of the cattle'

class EmailPage extends DoubleTextInputPage {
  constructor() {
    super({
      firstId,
      lastId,
      input1Error,
      input2Error
    })
  }

  pagePath = 'receiving-the-licence/licence-name'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
  firstNameLengthError = 'First name must be no longer than 50 characters'
  lastNameLengthError = 'Last name must be no longer than 50 characters'

  async fieldLengthErrorTest(firstName, lastName) {
    await this.inputTextAndContinue(firstName, lastName)
    await this.verifyErrorsOnPage(
      this.firstFieldError(),
      this.firstNameLengthError
    )
    await super.verifyErrorsOnPage(
      this.lastFieldError(),
      this.lastNameLengthError
    )
  }
}

export default new EmailPage()
