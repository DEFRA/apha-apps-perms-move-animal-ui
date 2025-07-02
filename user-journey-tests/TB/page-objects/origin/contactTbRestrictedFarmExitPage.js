import { Page } from '../page.js'

const pageHeadingAndTitle =
  'You need to contact the TB restricted farm the animals are moving onto'

class ContactTbRestrictedFarmExitPage extends Page {
  pagePath = 'origin/contact-the-tb-restricted-farm'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new ContactTbRestrictedFarmExitPage()
