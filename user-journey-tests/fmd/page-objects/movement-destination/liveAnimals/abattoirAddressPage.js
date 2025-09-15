import { AddressBasePage } from '../../../../base-pages/addressBasePage.js'

const pageHeadingAndTitle = 'What is the address of the approved abattoir?'

class AbattoirAddressPage extends AddressBasePage {
  pagePath = 'fmd/movement-destination/abattoir-address'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new AbattoirAddressPage()
