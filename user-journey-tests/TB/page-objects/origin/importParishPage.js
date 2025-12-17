import { CPHBasePage } from '../base-pages/cphBasePage.js'

const pageHeadingAndTitle =
  'What is the county parish holding (CPH) number of the UK point of entry?'

class ImportParishPage extends CPHBasePage {
  pagePath =
    'tb-origin/what-is-the-county-parish-holding-cph-number-of-where-the-animals-are-moving-off'

  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle
}

export default new ImportParishPage()
