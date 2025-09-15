import { AddressBasePage } from '../../../../base-pages/addressBasePage.js'

const pageHeadingAndTitle = 'What is the destination premises address?'

class AnimalAddressPage extends AddressBasePage {
  pagePath = 'fmd/movement-destination/address'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new AnimalAddressPage()
