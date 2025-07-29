import { AddressBasePage } from '../../../base-pages/addressBasePage.js'

const pageHeadingAndTitle = 'What is the destination address?'

class DestinationAddressPage extends AddressBasePage {
  pagePath = 'exotics/movement-destination/address'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new DestinationAddressPage()
