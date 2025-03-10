import { YesNoRadioPage } from '../base-pages/yesNoRadioBase.js'

const pageId = 'grazing'
const pageHeadingAndTitle = 'Will the incoming cattle be grazed?'
const noInputError = 'Select if the incoming cattle will be grazed'

class GrazingPage extends YesNoRadioPage {
  constructor() {
    super({
      pageId,
      noInputError
    })
  }

  pagePath = 'biosecurity/grazing'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new GrazingPage()
