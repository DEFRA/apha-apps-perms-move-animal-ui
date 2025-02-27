/* eslint-disable lines-between-class-members */
import { YesNoRadioPage } from '../base-pages/yesNoRadioBase.js'

const pageHeadingAndTitle =
  'Will you separate the incoming cattle from the resident herd?'
const pageId = 'keptSeparately'
const noInputError = 'Select if the incoming cattle will be kept separately'

class KeptSeparatelyPage extends YesNoRadioPage {
  constructor() {
    super({
      pageId,
      noInputError
    })
  }

  pagePath = 'biosecurity/kept-separately'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new KeptSeparatelyPage()
