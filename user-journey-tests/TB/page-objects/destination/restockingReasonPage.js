import { CheckboxBasePage } from '../base-pages/checkboxBasePage.js'

const pageId = 'restockReasons'
const pageHeadingAndTitle = 'Which reasons do you have for restocking?'
const noInputError = 'Select the reasons you have for restocking'

const checkboxIds = [
  'fattening',
  'breeding',
  'sucklingRestocking',
  'dairyRestocking',
  'other'
]

class RestockingReasonPage extends CheckboxBasePage {
  pagePath = 'destination/restocking-additional-info-reason'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      checkboxIds,
      pageId,
      noInputError
    })
  }
}

export default new RestockingReasonPage()
