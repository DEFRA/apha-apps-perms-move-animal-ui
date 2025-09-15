import { Page } from '../../../TB/page-objects/page'

const pageHeadingAndTitle =
  'You must dispose of animal by products at certain locations'

class ByProductsExitPage extends Page {
  pagePath = 'fmd/disposal-of-animals/ABP-somewhere-else'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new ByProductsExitPage()
