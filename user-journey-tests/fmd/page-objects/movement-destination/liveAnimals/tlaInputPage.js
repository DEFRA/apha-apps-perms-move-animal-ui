import { SingleTextInputPage } from '../../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle =
  'What is the TLA or temporary county parish holding (tCPH) number?'

class TLAInputPage extends SingleTextInputPage {
  constructor() {
    super({
      pageId: 'tlaOrTcphNumber',
      noInputError: 'Enter the TLA or tCPH number'
    })
  }

  pagePath = 'fmd/movement-destination/TLA-or-tCPH-number'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new TLAInputPage()
