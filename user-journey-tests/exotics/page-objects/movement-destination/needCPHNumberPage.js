import { Page } from '../../../TB/page-objects/page'

const pageHeadingAndTitle =
  "You need the destination's CPH number to continue your application"

class NeedCPHNumberPage extends Page {
  pagePath = 'exotics/movement-destination/cph-needed'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new NeedCPHNumberPage()
