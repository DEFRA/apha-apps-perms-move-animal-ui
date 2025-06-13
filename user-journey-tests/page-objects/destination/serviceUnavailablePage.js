import { Page } from '../page.js'

const pageHeadingAndTitle =
  'This service is not available for your movement type'

class ServiceUnavailablePage extends Page {
  pagePath = 'destination/tb-isolation-unit'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  get govUkFormLink() {
    return $(
      'a[href*="gov.uk/government/publications/approved-tb-isolation-unit-application"]'
    )
  }
}

export default new ServiceUnavailablePage()
