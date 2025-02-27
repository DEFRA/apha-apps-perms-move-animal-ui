/* eslint-disable lines-between-class-members */
import { SingleTextInputPage } from '../base-pages/singleTextInputPage.js'

const pageId = 'lastGrazed'
const pageHeadingAndTitle = 'How long ago was the field last grazed by cattle?'
const noInputError = 'Enter when the field was last grazed by cattle'

class LastGrazedPage extends SingleTextInputPage {
  constructor() {
    super({ pageId, noInputError })
  }

  pagePath = 'biosecurity/last-grazed'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle
}

export default new LastGrazedPage()
