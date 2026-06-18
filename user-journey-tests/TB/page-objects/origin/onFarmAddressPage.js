import { AddressBasePage } from '../base-pages/addressBasePage.js'

const pageHeadingAndTitle =
  'What is the address of the farm or premises where the animals are moving off?'

class OnFarmAddressPage extends AddressBasePage {
  pagePath = 'origin/origin-farm-address'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new OnFarmAddressPage()
