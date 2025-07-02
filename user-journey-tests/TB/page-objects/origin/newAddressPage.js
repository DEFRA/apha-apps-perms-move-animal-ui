import { AddressBasePage } from '../base-pages/addressBasePage.js'

const pageHeadingAndTitle =
  'What is the address of your farm or premises where the animals are moving off?'

class NewAddressPage extends AddressBasePage {
  pagePath = 'origin/address'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new NewAddressPage()
