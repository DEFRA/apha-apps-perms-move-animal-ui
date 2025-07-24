import { YesNoRadioPage } from '../../../base-pages/yesNoRadioBase.js'

const pageHeadingAndTitle = 'Will the visit be at an RPA registered field?'

class RegisteredFieldPage extends YesNoRadioPage {
  pagePath = 'exotics/movement-origin/rpa-field'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'inRpaRegisteredField',
      noInputError: 'Select if the visit will be at an RPA registered field'
    })
  }
}

export default new RegisteredFieldPage()
