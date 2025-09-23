import { DateBasePage } from '../../../../base-pages/dateBasePage'

const pageHeadingAndTitle = 'What date does your movement end?'

class MovementEndDatePage extends DateBasePage {
  pagePath = 'fmd/movement-details/end-date'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'date',
      errors: {
        noInputError: 'Enter the movement end date'
      }
    })
  }
}

export default new MovementEndDatePage()
