import { CPHBasePage } from '../../../base-pages/cphBasePage.js'

const pageHeadingAndTitle =
  'What is the CPH number for premises where the visit is happening?'

class CPHNumberPage extends CPHBasePage {
  pagePath = 'exotics/location-of-visit/cph-number'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle
}

export default new CPHNumberPage()
