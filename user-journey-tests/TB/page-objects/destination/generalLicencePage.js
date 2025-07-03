import { selectElement } from '../../helpers/page.js'
import { Page } from '../page.js'

const pageHeadingAndTitle = 'Check if you have a general licence'

class GeneralLicencePage extends Page {
  pagePath = 'destination/use-general-licence'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  get continueLink() {
    return $('a=Continue')
  }

  selectContinueLink() {
    return selectElement(this.continueLink)
  }
}

export default new GeneralLicencePage()
