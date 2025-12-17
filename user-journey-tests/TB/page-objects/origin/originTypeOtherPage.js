import { SingleTextInputPage } from '../base-pages/singleTextInputPage.js'

const pageId = 'originTypeOther'
const pageHeadingAndTitle =
  'What type of premises with TB restrictions are the animals moving off?'
const noInputError =
  'Enter type of premises with TB restrictions are the animals moving off'

class OriginTypeOtherPage extends SingleTextInputPage {
  constructor() {
    super({ pageId, noInputError })
  }

  pagePath =
    'tb-origin/what-type-of-premises-with-tb-restrictions-are-the-animals-moving-off'

  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle
}

export default new OriginTypeOtherPage()
