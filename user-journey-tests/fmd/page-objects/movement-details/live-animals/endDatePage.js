import BaseDatePage from '../../../../base-pages/dateBasePage'

const pageHeadingAndTitle = 'What date does your movement end?'

class MovementEndDatePage extends BaseDatePage {
  constructor() {
    super({
      pagePath: 'fmd/movement-details/end-date',
      pageHeadingAndTitle,
      pageId: 'date',
      errors: {
        noInputError: 'Enter the movement end date'
      }
    })
  }
}

export default new MovementEndDatePage()
