import { SingleTextInputPage } from '../base-pages/singleTextInputPage.js'

const pageId = 'maxNumberOfAnimals'
const pageHeadingAndTitle =
  'Enter the maximum number of animals you are planning to move'
const noInputError = 'Enter how many animals you are planning to move'
const invalidFormatError = 'Enter a number'

class HowManyAnimalsPage extends SingleTextInputPage {
  constructor() {
    super({ pageId, noInputError, invalidFormatError })
  }

  pagePath = 'destination/how-many-animals'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle
}

export default new HowManyAnimalsPage()
