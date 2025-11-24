import { DoubleTextInputPage } from '../base-pages/doubleTextInputPage.js'

const firstId = 'firstName'
const lastId = 'lastName'
const pageHeadingAndTitle = 'What is your name?'
const input1Error = 'Enter your first name'
const input2Error = 'Enter your last name'

class YourNamePage extends DoubleTextInputPage {
  constructor() {
    super({
      firstId,
      lastId,
      input1Error,
      input2Error
    })
  }

  pagePath = 'receiving-the-licence/your-name'
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

export default new YourNamePage()
