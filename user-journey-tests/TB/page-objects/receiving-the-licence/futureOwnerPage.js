import { DoubleTextInputPage } from '../base-pages/doubleTextInputPage.js'

const firstId = 'firstName'
const lastId = 'lastName'
const pageHeadingAndTitle = 'Who will be the registered owner of the cattle?'
const input1Error =
  'Enter the first name of who will be the registered owner of the cattle'
const input2Error =
  'Enter the last name of who will be the registered owner of the cattle'

class FutureOwnerPage extends DoubleTextInputPage {
  constructor() {
    super({
      firstId,
      lastId,
      input1Error,
      input2Error
    })
  }

  pagePath = 'receiving-the-licence/licence-name-future'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new FutureOwnerPage()
