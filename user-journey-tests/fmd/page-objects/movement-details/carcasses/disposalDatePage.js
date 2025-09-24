import { DateBasePage } from '../../../../base-pages/dateBasePage'

const pageHeadingAndTitle =
  'What date do you expect the disposal to take place?'

class DisposalDatePage extends DateBasePage {
  pagePath = 'fmd/movement-details/disposal-date'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'date',
      errors: {
        noInputError: 'Enter the date you expect the disposal to take place'
      }
    })
  }
}

export default new DisposalDatePage()
