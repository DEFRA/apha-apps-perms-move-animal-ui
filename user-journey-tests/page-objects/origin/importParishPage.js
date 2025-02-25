import { CPHBasePage } from '../base-pages/cphBasePage.js'

const pageHeadingAndTitle =
  'What is the County Parish Holding (CPH) number of the UK point of entry?'

class ImportParishPage extends CPHBasePage {
  pagePath = 'origin/import-cph'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle
}

export default new ImportParishPage()
