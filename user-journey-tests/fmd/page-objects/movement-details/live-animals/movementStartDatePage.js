import { DateBasePage } from '../../../../base-pages/dateBasePage'

const pageHeadingAndTitle = 'What date does your movement start?'

class MovementStartDatePage extends DateBasePage {
  pagePath = 'fmd/movement-details/start-date'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'date',
      errors: {
        noInputError: 'Enter the movement start date'
      }
    })
  }
}

export default new MovementStartDatePage()
