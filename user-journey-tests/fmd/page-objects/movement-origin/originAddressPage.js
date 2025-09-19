import { AddressBasePage } from '../../../base-pages/addressBasePage.js'

const pageHeadingAndTitle = 'What is the origin premises address?'

class OriginAddressPage extends AddressBasePage {
  pagePath = 'fmd/movement-origin/address'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new OriginAddressPage()
