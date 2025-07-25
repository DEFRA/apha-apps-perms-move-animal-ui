import { DoubleTextInputPage } from '../../../base-pages/doubleTextInputPage.js'

const firstId = 'firstName'
const lastId = 'lastName'
const pageHeadingAndTitle =
  'Who is responsible for the premises where the visit is happening?'
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

  pagePath = 'exotics/receiving-the-licence/visit/responsible-person-name'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new WhoIsResponsiblePage()
