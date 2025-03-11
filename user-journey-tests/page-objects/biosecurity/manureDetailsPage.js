import { SingleTextInputPage } from '../base-pages/singleTextInputPage'

const pageId = 'manureAndSlurryDetails'
const pageHeadingAndTitle = 'How will you manage manure and slurry?'
const noInputError = 'Enter how you will manage manure and slurry'

class ManureDetailsPage extends SingleTextInputPage {
  constructor() {
    super({ pageId, noInputError })
  }

  pagePath = 'biosecurity/manure-and-slurry-details'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle
}

export default new ManureDetailsPage()
