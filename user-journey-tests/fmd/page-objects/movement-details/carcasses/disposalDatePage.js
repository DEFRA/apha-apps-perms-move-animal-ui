import BaseDatePage from '../../../../base-pages/dateBasePage'

const pageHeadingAndTitle =
  'What date do you expect the disposal to take place?'

class DisposalDatePage extends BaseDatePage {
  constructor() {
    super({
      pagePath: 'fmd/movement-details/disposal-date',
      pageHeadingAndTitle,
      pageId: 'date',
      errors: {
        noInputError: 'Enter the date you expect the disposal to take place'
      }
    })
  }
}

export default new DisposalDatePage()
