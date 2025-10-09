import { DateBasePage } from '../../../base-pages/dateBasePage.js'

const pageHeadingAndTitle =
  'What date do you expect the disposal to take place?'

class DisposalDatePage extends DateBasePage {
  pagePath = 'fmd/disposal-of-animal/date-of-disposal'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
  constructor() {
    super({
      pageId: 'date',
      errors: {
        noInputError: 'Enter the disposal date'
      }
    })
  }
}

export default new DisposalDatePage()
