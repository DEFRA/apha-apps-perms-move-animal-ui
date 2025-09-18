import { DoubleTextInputPage } from '../../../base-pages/doubleTextInputPage.js'

const firstId = 'firstName'
const lastId = 'lastName'
const pageHeadingAndTitle = 'Who is responsible for the origin premises?'
const input1Error = 'Enter a first name'
const input2Error = 'Enter a last name'

class ResponsibleForOriginPage extends DoubleTextInputPage {
  constructor() {
    super({
      firstId,
      lastId,
      input1Error,
      input2Error
    })
  }

  pagePath = 'fmd/receiving-the-licence/name-of-person-responsible-at-origin'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new ResponsibleForOriginPage()
