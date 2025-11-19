import { DoubleTextInputPage } from '../base-pages/doubleTextInputPage.js'

const firstId = 'firstName'
const lastId = 'lastName'
const pageHeadingAndTitle =
  'What is the name of the person who will be the registered keeper of the animals?'
const input1Error =
  'Enter the first name of the person who will be the registered keeper of the animals'
const input2Error =
  'Enter the last name of the person who will be the registered keeper of the animals'

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
