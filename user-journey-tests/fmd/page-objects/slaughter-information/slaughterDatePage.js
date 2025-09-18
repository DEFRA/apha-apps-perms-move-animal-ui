import { DateBasePage } from '../../../base-pages/dateBasePage'

const pageHeadingAndTitle =
  'What date do you expect the slaughter to take place?'

class ExpectedSlaughterDatePage extends DateBasePage {
  pagePath = 'fmd/slaughter-information/date-of-slaughter'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'date',
      errors: {
        noInputError: 'Enter the date you expect the slaughter to take place'
      }
    })
  }
}

export default new ExpectedSlaughterDatePage()
