/* eslint-disable lines-between-class-members */
import { SingleTextInputPage } from '../base-pages/singleTextInputPage.js'

const pageId = 'restockAdditionalInfo'
const pageHeadingAndTitle = 'What is the reason for restocking?'
const noInputError = 'Enter the reason for restocking'

class OtherRestockingReason extends SingleTextInputPage {
  constructor() {
    super({ pageId, noInputError })
  }

  pagePath = 'destination/restocking-additional-info-reason-other'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle
}

export default new OtherRestockingReason()
