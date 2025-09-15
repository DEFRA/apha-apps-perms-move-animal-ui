import { CPHBasePage } from '../../../base-pages/cphBasePage.js'

const pageHeadingAndTitle =
  'What is the county parish holding (CPH) number of the origin premises?'

class OriginCPHPage extends CPHBasePage {
  pagePath = 'fmd/movement-origin/cph-number'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle
}

export default new OriginCPHPage()
