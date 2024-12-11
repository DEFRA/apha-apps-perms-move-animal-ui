import { Page } from '../page.js'
import * as page from '../../helpers/page.js'

const emailId = 'emailAddress'
const pageHeadingAndTitle =
  'What email address would you like the licence sent to?'

class EmailPage extends Page {
  pagePath = '/receiving-the-licence/licence-enter-email-address'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  emailAddressInput() {
    return super.getInputField(emailId)
  }

  emailFieldError() {
    return super.getErrorElement(emailId)
  }

  emailAddressErrorLink() {
    return super.getErrorLink(emailId)
  }

  get invalidFormatError() {
    return 'Enter an email address in the correct format, like name@example.com'
  }

  get noInputError() {
    return 'Enter the email address you would like the licence sent to'
  }

  async inputEmailAndContinue(text) {
    await page.typeIntoElement(this.emailAddressInput(), text)
    await super.selectContinue()
  }

  async emailInputErrorTest(textInput, errorMessage) {
    await this.inputEmailAndContinue(textInput)
    await super.verifyErrorsOnPage(this.emailFieldError(), errorMessage)
    await super.verifySummaryErrorLink(
      this.emailAddressErrorLink(),
      this.emailAddressInput()
    )
    const inputValue = await this.emailAddressInput().getValue()
    expect(inputValue).toBe(textInput)
  }
}

export default new EmailPage()
