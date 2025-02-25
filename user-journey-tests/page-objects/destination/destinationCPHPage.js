import { CPHBasePage } from '../base-pages/cphBasePage.js'

const pageHeadingAndTitle =
  'What is the County Parish Holding (CPH) number of the farm or premises where the animals are going to?'

class DestinationCPHPage extends CPHBasePage {
  pagePath = 'destination/destination-farm-cph'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle
}

export default new DestinationCPHPage()
