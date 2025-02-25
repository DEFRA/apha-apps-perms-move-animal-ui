import { AddressBasePage } from '../base-pages/addressBasePage.js'

const pageHeadingAndTitle =
  'What is the address of the farm or premises where the animals are going to?'

class DestinationAddressPage extends AddressBasePage {
  pagePath = 'destination/destination-farm-address'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new DestinationAddressPage()
