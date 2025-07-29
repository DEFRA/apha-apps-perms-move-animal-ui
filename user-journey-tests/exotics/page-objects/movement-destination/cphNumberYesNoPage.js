import { YesNoRadioPage } from '../../../base-pages/yesNoRadioBase.js'

const pageHeadingAndTitle = 'Do you know the CPH number of the destination?'

class CPHNumberYesNoPage extends YesNoRadioPage {
  pagePath = 'exotics/movement-destination/cph-yes-no'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'cphNumberKnown',
      noInputError: 'Select if you know the CPH number of the destination'
    })
  }
}

export default new CPHNumberYesNoPage()
