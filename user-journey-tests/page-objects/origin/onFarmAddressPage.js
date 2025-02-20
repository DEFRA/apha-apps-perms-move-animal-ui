import { Page } from '../page.js'

const pageHeadingAndTitle =
  'What is the address of the farm or premises where the animals are moving off?'

class OnFarmAddressPage extends Page {
  pagePath = 'origin/origin-farm-address'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new OnFarmAddressPage()
