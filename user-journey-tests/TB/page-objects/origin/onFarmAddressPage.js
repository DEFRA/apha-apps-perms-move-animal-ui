import { NewAddressBasePage } from '../base-pages/newAddressBasePage.js'

const pageHeadingAndTitle =
  'What is the address of the farm or premises where the animals are moving off?'

class OnFarmAddressPage extends NewAddressBasePage {
  pagePath = 'tb-origin/what-is-the-address-where-the-animals-are-moving-off'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new OnFarmAddressPage()
