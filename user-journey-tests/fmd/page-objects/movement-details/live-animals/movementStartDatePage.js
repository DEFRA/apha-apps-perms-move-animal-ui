import BaseDatePage from '../../../../base-pages/dateBasePage'

const pageHeadingAndTitle = 'What date does your movement start?'

class MovementStartDatePage extends BaseDatePage {
  constructor() {
    super({
      pagePath: 'fmd/movement-details/start-date',
      pageHeadingAndTitle,
      pageId: 'date',
      errors: {
        noInputError: 'Enter the movement start date'
      }
    })
  }
}

export default new MovementStartDatePage()
