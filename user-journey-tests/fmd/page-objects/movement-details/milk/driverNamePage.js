import { DoubleTextInputPage } from '../../../../base-pages/doubleTextInputPage.js'

const firstId = 'firstName'
const lastId = 'lastName'
const pageHeadingAndTitle = "What is the vehicle driver's name?"
const input1Error = 'Enter the first name of the vehicle driver'
const input2Error = 'Enter the last name of the vehicle driver'

class DriverNamePage extends DoubleTextInputPage {
  constructor() {
    super({
      firstId,
      lastId,
      input1Error,
      input2Error
    })
  }

  pagePath = 'fmd/movement-details/driver-name'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new DriverNamePage()
