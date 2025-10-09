import { DateBasePage } from '../../../../base-pages/dateBasePage.js'

const pageHeadingAndTitle = 'When is the date when you expect the milk to move?'

class SigngleMovementDatePage extends DateBasePage {
  pagePath = 'fmd/movement-details/milk-movement-dates'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'date',
      errors: {
        noInputError: 'Enter the start date'
      }
    })
  }
}

export default new SigngleMovementDatePage()
