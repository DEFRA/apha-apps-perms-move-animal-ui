import { SingleTextInputPage } from '../base-pages/singleTextInputPage.js'

const pageId = 'country'
const pageHeadingAndTitle = 'Which country are the animals coming from?'
const noInputError = 'Enter which country the animals are coming from'
const invalidFormatError = 'Your answer must be no longer than 255 characters'

class OriginCountryPage extends SingleTextInputPage {
  constructor() {
    super({ pageId, noInputError, invalidFormatError })
  }

  pagePath = 'origin/country'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new OriginCountryPage()
