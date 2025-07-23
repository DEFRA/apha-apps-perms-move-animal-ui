import { SingleTextInputPage } from '../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle = 'What are the dates for when you expect the movement to take place?'

class MovementDatesPage extends SingleTextInputPage {
  constructor() {
    super({
      pageId: 'multipleDates',
      noInputError: 'Enter the dates when you expect the movement to take place'
    })
  }

  pagePath = 'exotics/movement-details/multiple-dates'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new MovementDatesPage()