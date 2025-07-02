import { AddressBasePage } from '../base-pages/addressBasePage.js'

const pageHeadingAndTitle = 'What is the address of the UK point of entry?'

class ImportAddressPage extends AddressBasePage {
  pagePath = 'origin/import-address'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new ImportAddressPage()
