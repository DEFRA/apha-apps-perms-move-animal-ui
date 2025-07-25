import { YesNoRadioPage } from '../../../../base-pages/yesNoRadioBase.js'

const pageHeadingAndTitle = 'Is the premises designated?'

class DesignatedPremisesPage extends YesNoRadioPage {
  pagePath = 'exotics/movement-origin/designated-premises'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'isDesignatedPremises',
      noInputError: 'Select if the premises is designated'
    })
  }
}

export default new DesignatedPremisesPage()
