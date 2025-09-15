import { CPHBasePage } from '../../../base-pages/cphBasePage.js'

const pageHeadingAndTitle =
  'What is the TLA or temporary county parish holding (tCPH) number?'

class TLAValuePage extends CPHBasePage {
  pagePath = 'fmd/movement-origin/TLA-or-tCPH-number'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle
}

export default new TLAValuePage()
