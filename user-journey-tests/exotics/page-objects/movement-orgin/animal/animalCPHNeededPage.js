import { Page } from '../../../../TB/page-objects/page'

const pageHeadingAndTitle =
  'This service is not available for your movement type'

class AnimalCPHNeededPage extends Page {
  pagePath = 'exotics/movement-origin/animal-location/cph-needed'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  get govUkFormLink() {
    return $(
      'a[href*="gov.uk/guidance/apply-for-a-county-parish-holding-cph-number"]'
    )
  }
}

export default new AnimalCPHNeededPage()
