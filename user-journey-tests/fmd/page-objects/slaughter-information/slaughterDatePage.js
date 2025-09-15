import BaseDatePage from '../../../base-pages/dateBasePage'

const pageHeadingAndTitle =
  'What date do you expect the slaughter to take place?'

class ExpectedSlaughterDatePage extends BaseDatePage {
  constructor() {
    super({
      pagePath: 'fmd/slaughter-information/date-of-slaughter',
      pageHeadingAndTitle,
      pageId: 'date',
      errors: {
        noInputError: 'Enter the date you expect the slaughter to take place'
      }
    })
  }
}

export default new ExpectedSlaughterDatePage()
