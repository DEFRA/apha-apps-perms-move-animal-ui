import { Page } from '../../../TB/page-objects/page'

const pageHeadingAndTitle = 'You must dispose of carcasses at certain locations'

class CarcassesExitPage extends Page {
  pagePath = 'fmd/disposal-of-animals/carcasses-somewhere-else'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new CarcassesExitPage()
