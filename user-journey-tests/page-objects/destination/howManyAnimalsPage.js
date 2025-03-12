import { SingleTextInputPage } from '../base-pages/singleTextInputPage.js'

const pageId = 'howManyAnimals'
const pageHeadingAndTitle = 'How many animals are you planning to move?'
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
