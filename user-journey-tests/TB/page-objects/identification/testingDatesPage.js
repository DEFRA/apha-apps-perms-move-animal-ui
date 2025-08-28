/* eslint-disable lines-between-class-members */
import { SingleTextInputPage } from '../base-pages/singleTextInputPage.js'

const pageId = 'testingDates'
const noInputError =
  'Enter the dates when animals over 42 days old were last tested for TB'

class TestingDatesPage extends SingleTextInputPage {
  constructor() {
    super({ pageId, noInputError })
  }

  pagePath = 'identification/enter-testing-dates'
  pageHeading = 'Testing dates'
  pageTitle =
    'What are the dates of the last TB tests for the animals that are 42 days old or older?'
}

export default new TestingDatesPage()
