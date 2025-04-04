/* eslint-disable lines-between-class-members */
import { SingleTextInputPage } from '../base-pages/singleTextInputPage.js'

const pageId = 'testingDates'
const pageHeadingAndTitle =
  'What are the dates of the last TB tests for the cattle that are 42 days old or older?'
const noInputError =
  'Enter the dates when cattle over 42 days old were last tested for TB'

class TestingDatesPage extends SingleTextInputPage {
  constructor() {
    super({ pageId, noInputError })
  }

  pagePath = 'identification/enter-testing-dates'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle
}

export default new TestingDatesPage()
