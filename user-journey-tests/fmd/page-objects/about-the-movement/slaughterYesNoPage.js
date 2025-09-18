import { YesNoRadioPage } from '../../../base-pages/yesNoRadioBase.js'

const pageHeadingAndTitle = 'Are the animals moving to slaughter?'

class SlaughterYesNoPage extends YesNoRadioPage {
  pagePath = 'fmd/about-the-movement-or-activity/slaughter-yes-no'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'moveToSlaughter',
      noInputError: 'Select if the animals are moving to slaughter'
    })
  }
}

export default new SlaughterYesNoPage()
