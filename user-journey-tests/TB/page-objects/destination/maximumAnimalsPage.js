import { SingleTextInputPage } from '../base-pages/singleTextInputPage.js'

const pageId = 'howManyAnimalsMaximum'
const pageHeadingAndTitle =
  'What is the maximum number of animals you are planning to move?'
const noInputError =
  'Enter the maximum number of animals you are planning to move'
const invalidFormatError = 'Enter a number'

class MaximumAnimalsPage extends SingleTextInputPage {
  constructor() {
    super({ pageId, noInputError, invalidFormatError })
  }

  pagePath = 'destination/how-many-animals-maximum'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle
}

export default new MaximumAnimalsPage()
