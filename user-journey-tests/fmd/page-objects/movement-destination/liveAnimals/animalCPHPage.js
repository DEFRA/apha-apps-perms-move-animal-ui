import { CPHBasePage } from '../../../../base-pages/cphBasePage.js'

const pageHeadingAndTitle =
  'What is the county parish holding (CPH) number of the destination premises?'

class AnimalCPHPage extends CPHBasePage {
  pagePath = 'fmd/movement-destination/cph-number'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle
}

export default new AnimalCPHPage()
