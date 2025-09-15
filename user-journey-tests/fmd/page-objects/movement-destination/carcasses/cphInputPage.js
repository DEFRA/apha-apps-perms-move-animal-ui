import { CPHBasePage } from '../../../../base-pages/cphBasePage.js'

const pageHeadingAndTitle =
  'What is the county parish holding (CPH) number for the destination premises?'

class CPHInputPage extends CPHBasePage {
  pagePath = 'fmd/movement-destination/carcasses-cph-number'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle
}

export default new CPHInputPage()
