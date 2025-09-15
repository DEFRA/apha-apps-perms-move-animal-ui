import { Page } from '../../../../TB/page-objects/page'

const pageHeadingAndTitle = 'Carcasses must be disposed of at certain locations'

class CarcassExitPage extends Page {
  pagePath = 'fmd/movement-destination/somewhere-else'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new CarcassExitPage()
