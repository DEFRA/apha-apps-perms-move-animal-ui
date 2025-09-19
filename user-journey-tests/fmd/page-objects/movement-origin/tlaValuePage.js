import { SingleTextInputPage } from '../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle =
  'What is the TLA or temporary county parish holding (tCPH) number?'

class TLAValuePage extends SingleTextInputPage {
  pagePath = 'fmd/movement-origin/TLA-or-tCPH-number'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'tlaOrTcphNumber',
      noInputError: 'Enter the TLA or tCPH number'
    })
  }
}

export default new TLAValuePage()
