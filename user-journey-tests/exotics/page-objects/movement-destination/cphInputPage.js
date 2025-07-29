import { CPHBasePage } from '../../../base-pages/cphBasePage.js'

const pageHeadingAndTitle =
  'What is the CPH number for the destination premises?'

class CPHInputPage extends CPHBasePage {
  pagePath = 'exotics/movement-destination/cph-number'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle
}

export default new CPHInputPage()
