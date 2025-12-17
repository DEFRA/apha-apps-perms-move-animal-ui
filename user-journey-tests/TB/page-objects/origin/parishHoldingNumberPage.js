import { CPHBasePage } from '../base-pages/cphBasePage.js'

const pageHeadingAndTitle =
  'What is the county parish holding (CPH) number of your farm or premises where the animals are moving off?'

class ParishHoldingNumberPage extends CPHBasePage {
  pagePath =
    'tb-origin/what-is-the-county-parish-holding-cph-number-of-where-the-animals-are-moving-off'

  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle
  noInputError =
    'Enter the CPH number of your farm or premises where the animals are moving off'

  invalidFormatError =
    'Enter a valid the CPH number of your farm or premises where the animals are moving off'

  invalidFormatErrorLong =
    'The CPH number of your farm or premises where the animals are moving off must be 11 characters or less'
}

export default new ParishHoldingNumberPage()
