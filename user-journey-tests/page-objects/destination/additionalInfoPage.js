import { Page } from '../page.js'

const pageHeadingAndTitle = 'Enter any additional information (optional)'

class AdditionalInfoPage extends Page {
  pagePath = 'destination/any-additional-info'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle

  get additionInfoInput() {
    return $('#additionalInfo')
  }
}

export default new AdditionalInfoPage()
