import { NewAnswersBasePage } from '../base-pages/newAnswersBasePage.js'

const pageHeadingAndTitle = 'What is the address of the UK point of entry?'

class ImportAddressPage extends NewAnswersBasePage {
  pagePath = 'tb-origin/what-is-the-address-where-the-animals-are-moving-off'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new ImportAddressPage()
