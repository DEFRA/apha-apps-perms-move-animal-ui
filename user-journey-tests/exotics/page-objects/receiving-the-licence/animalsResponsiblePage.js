import { DoubleTextInputPage } from '../../../base-pages/doubleTextInputPage.js'

const firstId = 'firstName'
const lastId = 'lastName'
const pageHeadingAndTitle =
  'What is the name of the current keeper of the animals?'
const input1Error = 'Enter a first name'
const input2Error = 'Enter a last name'

class AnimalsResponsiblePage extends DoubleTextInputPage {
  constructor() {
    super({
      firstId,
      lastId,
      input1Error,
      input2Error
    })
  }

  pagePath = 'exotics/receiving-the-licence/keeper-name'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new AnimalsResponsiblePage()
