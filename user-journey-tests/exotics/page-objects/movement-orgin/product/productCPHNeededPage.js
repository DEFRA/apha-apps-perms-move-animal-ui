import { Page } from '../../../../TB/page-objects/page'

const pageHeadingAndTitle =
  'This service is not available for your movement type'

class ProductCPHNeededPage extends Page {
  pagePath = 'exotics/movement-origin/product-location/cph-needed'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  get govUkFormLink() {
    return $(
      'a[href*="gov.uk/guidance/apply-for-a-county-parish-holding-cph-number"]'
    )
  }
}

export default new ProductCPHNeededPage()
