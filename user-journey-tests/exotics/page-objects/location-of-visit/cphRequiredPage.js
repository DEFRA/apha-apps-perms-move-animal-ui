import { Page } from '../../../TB/page-objects/page'

const pageHeadingAndTitle = 'You need a CPH number to continue your application'

class CPHRequiredPage extends Page {
  pagePath = 'exotics/location-of-visit/cph-needed'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  get govUkFormLink() {
    return $(
      'a[href*="gov.uk/guidance/apply-for-a-county-parish-holding-cph-number"]'
    )
  }
}

export default new CPHRequiredPage()
