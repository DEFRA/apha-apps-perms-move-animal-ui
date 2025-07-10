import { SingleTextInputPage } from '../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle =
  'What are the dates for when you expect the visits to take place?'

class VisitDatesPage extends SingleTextInputPage {
  constructor() {
    super({
      pageId: 'multipleDates',
      noInputError: 'Enter the dates when you expect the visits to take place'
    })
  }

  pagePath = 'exotics/visit-details/multiple-dates'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new VisitDatesPage()
