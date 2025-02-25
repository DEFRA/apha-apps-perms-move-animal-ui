import { Page } from '../page.js'
import * as page from '../../helpers/page.js'

const firstNameId = 'firstName'
const lastNameId = 'lastName'

const pageHeadingAndTitle =
  'What is the name of the County Parish Holding (CPH) owner?'

class EmailPage extends Page {
  pagePath = '/receiving-the-licence/licence-name'

  pageHeading = pageHeadingAndTitle

  pageTitle = pageHeadingAndTitle

  firstNameError =
    'Enter the first name of the County Parish Holding (CPH) owner'

  lastNameError = 'Enter the last name of the County Parish Holding (CPH) owner'

  firstNameLengthError = 'First name must be no longer than 50 characters'

  lastNameLengthError = 'Last name must be no longer than 50 characters'

  firstNameInput() {
    return super.getInputField(firstNameId)
  }

  lastNameInput() {
    return super.getInputField(lastNameId)
  }

  firstNameFieldError() {
    return super.getErrorElement(firstNameId)
  }

  lastNameFieldError() {
    return super.getErrorElement(lastNameId)
  }

  firstNameErrorLink() {
    return super.getErrorLink(firstNameId)
  }

  lastNameErrorLink() {
    return super.getErrorLink(lastNameId)
  }

  async inputNameAndContinue(firstName, lastName, nextPage) {
    await page.typeIntoElement(this.firstNameInput(), firstName)
    await page.typeIntoElement(this.lastNameInput(), lastName)
    await super.selectContinue()
    if (nextPage) page.waitForPagePath(nextPage.pagePath)
  }

  async verifyFirstNameErrors(single = true) {
    if (single) {
      await super.selectContinue()
    }
    await super.verifyErrorsOnPage(
      this.firstNameFieldError(),
      this.firstNameError
    )
    await super.verifySummaryErrorLink(
      this.firstNameErrorLink(),
      this.firstNameInput()
    )
  }

  async verifyLastNameErrors(single = true) {
    if (single) {
      await super.selectContinue()
    }
    await super.verifyErrorsOnPage(
      this.lastNameFieldError(),
      this.lastNameError
    )
    await super.verifySummaryErrorLink(
      this.lastNameErrorLink(),
      this.lastNameInput()
    )
  }

  async nameInputErrorTest() {
    await super.selectContinue()
    await this.verifyFirstNameErrors(false)
    await this.verifyLastNameErrors(false)
  }

  async fieldLengthErrorTest(firstName, lastName) {
    await this.inputNameAndContinue(firstName, lastName)
    await super.verifyErrorsOnPage(
      this.firstNameFieldError(),
      this.firstNameLengthError
    )
    await super.verifyErrorsOnPage(
      this.lastNameFieldError(),
      this.lastNameLengthError
    )
  }
}

export default new EmailPage()
