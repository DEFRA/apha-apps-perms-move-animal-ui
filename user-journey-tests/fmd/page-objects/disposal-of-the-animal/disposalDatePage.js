import BaseDatePage from '../../../base-pages/dateBasePage'

const pageHeadingAndTitle =
  'What date do you expect the disposal to take place?'

class DisposalDatePage extends BaseDatePage {
  constructor() {
    super({
      pagePath: 'fmd/disposal-of-animal/date-of-disposal',
      pageHeadingAndTitle,
      pageId: 'date',
      errors: {
        noInputError: 'Enter the disposal date'
      }
    })
  }
}

export default new DisposalDatePage()
