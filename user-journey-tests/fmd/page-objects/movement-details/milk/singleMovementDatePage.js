import BaseDatePage from '../../../../base-pages/dateBasePage'

const pageHeadingAndTitle = 'When is the date when you expect the milk to move?'

class SigngleMovementDatePage extends BaseDatePage {
  constructor() {
    super({
      pagePath: 'fmd/movement-details/milk-movement-dates',
      pageHeadingAndTitle,
      pageId: 'date',
      errors: {
        noInputError: 'Enter the start date'
      }
    })
  }
}

export default new SigngleMovementDatePage()
