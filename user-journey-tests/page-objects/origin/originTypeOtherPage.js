import { SingleTextInputPage } from '../base-pages/singleTextInputPage.js'

const pageId = 'originTypeOther'
const pageHeadingAndTitle =
  'What type of premises with TB restrictions are the animals moving off?'
const noInputError = 'Enter the premises type'

class OriginTypeOtherPage extends SingleTextInputPage {
  constructor() {
    super({ pageId, noInputError })
  }

  pagePath = 'origin/type-of-origin-other'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle
}

export default new OriginTypeOtherPage()
