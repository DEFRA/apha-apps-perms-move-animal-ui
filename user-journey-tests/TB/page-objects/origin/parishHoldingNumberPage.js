import { CPHBasePage } from '../base-pages/cphBasePage.js'

const pageHeadingAndTitle =
  'What is the county parish holding (CPH) number of your farm or premises where the animals are moving off?'

class ParishHoldingNumberPage extends CPHBasePage {
  pagePath = 'origin/cph-number'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle
}

export default new ParishHoldingNumberPage()
