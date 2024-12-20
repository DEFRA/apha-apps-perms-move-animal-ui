import { Page } from '../page.js'

const pageHeadingAndTitle =
  'This service is not available for your movement type'

class OriginTypeExitPage extends Page {
  pagePath = 'origin/can-not-use-service-premises-type'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new OriginTypeExitPage()
