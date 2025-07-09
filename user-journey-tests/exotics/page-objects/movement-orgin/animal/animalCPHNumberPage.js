import { CPHBasePage } from '../../../../base-pages/cphBasePage.js'

const pageHeadingAndTitle =
  'Does the origin premises have a county parish holding (CPH) number?'

class AnimalCPHNumberPage extends CPHBasePage {
  pagePath = 'exotics/movement-origin/animal-location/cph-number'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle
}

export default new AnimalCPHNumberPage()
