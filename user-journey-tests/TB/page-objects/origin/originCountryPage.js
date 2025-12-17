import { SingleTextInputPage } from '../base-pages/singleTextInputPage.js'

const pageId = 'country'
const pageHeadingAndTitle = 'Which country are the animals coming from?'
const noInputError = 'Enter which country the animals are coming from'
const invalidFormatError =
  'Which country the animals are coming from must be 255 characters or less'

class OriginCountryPage extends SingleTextInputPage {
  constructor() {
    super({ pageId, noInputError, invalidFormatError })
  }

  pagePath = 'tb-origin/which-country-are-the-animals-coming-from'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new OriginCountryPage()
