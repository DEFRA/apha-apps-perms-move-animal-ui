import { NewAddressBasePage } from '../base-pages/newAddressBasePage.js'

const pageHeadingAndTitle =
  'What is the address of your farm or premises where the animals are moving off?'

class NewAddressPage extends NewAddressBasePage {
  pagePath = 'tb-origin/what-is-the-address-where-the-animals-are-moving-off'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new NewAddressPage()
