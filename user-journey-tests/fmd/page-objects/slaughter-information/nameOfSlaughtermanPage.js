import { DoubleTextInputPage } from '../../../base-pages/doubleTextInputPage.js'

const firstId = 'firstName'
const lastId = 'lastName'
const pageHeadingAndTitle = 'What is the name of the Slaughterman?'
const input1Error = 'Enter the first name of who will be the Slaughterman'
const input2Error = 'Enter the last name of who will be the Slaughterman'

class NameOfSlaughtermanPage extends DoubleTextInputPage {
  constructor() {
    super({
      firstId,
      lastId,
      input1Error,
      input2Error
    })
  }

  pagePath = 'fmd/slaughter-information/name'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new NameOfSlaughtermanPage()
