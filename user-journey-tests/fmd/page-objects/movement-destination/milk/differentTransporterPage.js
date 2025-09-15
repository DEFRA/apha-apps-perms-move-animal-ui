import { YesNoRadioPage } from '../../../../base-pages/yesNoRadioBase.js'

const pageHeadingAndTitle =
  'Will the animals move on to a temporary land association (TLA)?'

class DifferentTransporterPage extends YesNoRadioPage {
  pagePath = 'fmd/movement-destination/TLA-yes-no'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'willMoveToTla',
      noInputError: 'Select if the destination premises is a TLA'
    })
  }
}

export default new DifferentTransporterPage()
