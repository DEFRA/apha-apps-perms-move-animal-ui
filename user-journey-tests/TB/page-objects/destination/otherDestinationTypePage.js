import { SingleTextInputPage } from '../base-pages/singleTextInputPage.js'

const pageId = 'destinationTypeOther'
const pageHeadingAndTitle =
  'What type of premises with TB restrictions are the animals going to?'
const noInputError = 'Enter the premises type'

class OriginTypeOtherPage extends SingleTextInputPage {
  constructor() {
    super({ pageId, noInputError })
  }

  pagePath = 'destination/type-of-destination-other'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle
}

export default new OriginTypeOtherPage()
