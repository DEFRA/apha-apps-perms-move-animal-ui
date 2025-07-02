import { Page } from './page.js'

const pageHeadingAndTitle = 'Accessibility statement'

class AccessibilityStatementPage extends Page {
  pagePath = '/accessibility-statement'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new AccessibilityStatementPage()
