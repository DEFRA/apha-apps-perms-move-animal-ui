import BaseDatePage from '../../../../base-pages/dateBasePage'

const pageHeadingAndTitle = 'What date does your movement start?'

class MovementStartDatePage extends BaseDatePage {
  constructor() {
    super({
      pagePath: 'fmd/movement-details/milk-movement-start-date',
      pageHeadingAndTitle,
      pageId: 'date',
      errors: {
        noInputError: 'Enter the start date of the milk movement'
      }
    })
  }
}

export default new MovementStartDatePage()
