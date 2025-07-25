import { AddressBasePage } from '../../../base-pages/addressBasePage.js'

const pageHeadingAndTitle = 'What is the origin premises address?'

class OriginPremisesAddressPage extends AddressBasePage {
  pagePath = 'exotics/movement-origin/address'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new OriginPremisesAddressPage()
