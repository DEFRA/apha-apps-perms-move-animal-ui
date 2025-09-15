import { AddressBasePage } from '../../../../base-pages/addressBasePage.js'

const pageHeadingAndTitle =
  'What is the address of the business removing the carcasses?'

class DestinationAddressPage extends AddressBasePage {
  pagePath = 'fmd/movement-destination/removing-business-address'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new DestinationAddressPage()
