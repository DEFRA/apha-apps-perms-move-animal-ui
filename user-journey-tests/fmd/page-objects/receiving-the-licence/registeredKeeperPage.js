import { DoubleTextInputPage } from '../../../base-pages/doubleTextInputPage.js'

const firstId = 'firstName'
const lastId = 'lastName'
const pageHeadingAndTitle = 'Who is the registered keeper of the animals?'
const input1Error = 'Enter a first name'
const input2Error = 'Enter a last name'

class WhoIsResponsiblePage extends DoubleTextInputPage {
  constructor() {
    super({
      firstId,
      lastId,
      input1Error,
      input2Error
    })
  }

  pagePath = 'fmd/receiving-the-licence/name-of-registered-keeper'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new WhoIsResponsiblePage()
