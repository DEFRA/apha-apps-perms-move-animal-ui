import { Page } from '../page.js'

const pageHeadingAndTitle =
  'This service is not available for your movement type'

class ServiceUnavailablePage extends Page {
  pagePath = 'destination/tb-isolation-unit'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  get govUkMailLink() {
    return $('a[href*="mailto:CSCTBUnits@apha.gov.uk"]')
  }
}

export default new ServiceUnavailablePage()
