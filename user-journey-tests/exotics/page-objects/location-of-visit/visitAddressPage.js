import { AddressBasePage } from '../../../base-pages/addressBasePage.js'

const pageHeadingAndTitle =
  'What is the address of where the visit will take place?'

class VisitAddressPage extends AddressBasePage {
  pagePath = 'exotics/location-of-visit/address'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new VisitAddressPage()
