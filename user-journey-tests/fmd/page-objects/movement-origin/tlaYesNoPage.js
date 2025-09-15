import { YesNoRadioPage } from '../../../base-pages/yesNoRadioBase.js'

const pageHeadingAndTitle = 'Is the origin premises a TLA?'

class TLAYesNoPage extends YesNoRadioPage {
  pagePath = 'fmd/movement-origin/TLA-yes-no'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'tla',
      noInputError: 'Select if the origin premises is a TLA'
    })
  }
}

export default new TLAYesNoPage()
