import { CPHBasePage } from '../base-pages/cphBasePage.js'

const pageHeadingAndTitle =
  'What is the County Parish Holding (CPH) number of the farm or premises where the animals are moving off?'

class OnFarmCPHPage extends CPHBasePage {
  pagePath = 'origin/origin-farm-cph'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle
}

export default new OnFarmCPHPage()
