/* eslint-disable lines-between-class-members */
import { Page } from '../page.js'

const pageHeadingAndTitle = 'Your application might be unsuccessful'

class IdentificationWarningPage extends Page {
  pagePath = 'identification/warning'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle
}

export default new IdentificationWarningPage()
