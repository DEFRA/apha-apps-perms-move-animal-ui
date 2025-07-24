import { YesNoRadioPage } from '../../../base-pages/yesNoRadioBase.js'

const pageHeadingAndTitle =
  'Does the premises where the visit is happening have a county parish holding (CPH) number?'

class CPHYesNoPage extends YesNoRadioPage {
  pagePath = 'exotics/location-of-visit/cph-yes-no'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'hasACphNumber',
      noInputError:
        'Select if the premises where the visit is happening has a CPH number'
    })
  }
}

export default new CPHYesNoPage()
