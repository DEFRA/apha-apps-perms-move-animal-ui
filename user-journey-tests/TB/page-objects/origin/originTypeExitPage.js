import { Page } from '../page.js'
import * as page from '../../helpers/page.js'

const pageHeadingAndTitle =
  'You need to contact the TB restricted farm the animals are moving onto'

class OriginTypeExitPage extends Page {
  pagePath = 'origin/contact-the-tb-restricted-farm'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  get viewApplicationLink() {
    return $(
      'a[href*="tb-restricted-cattle-application-for-movement-licence-in-england"]'
    )
  }

  async verifyViewApplicationLink() {
    await page.validateHrefOfElement(
      this.viewApplicationLink,
      'https://www.gov.uk/government/publications/tb-restricted-cattle-application-for-movement-licence-in-england'
    )
  }
}

export default new OriginTypeExitPage()
