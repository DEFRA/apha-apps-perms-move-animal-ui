import { Page } from '../page.js'

const pageHeadingAndTitle = 'What is the address of the UK point of entry?'

class ImportAddressPage extends Page {
  pagePath = 'origin/import-address'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new ImportAddressPage()
