import { YesNoRadioPage } from '../../../../base-pages/yesNoRadioBase.js'

const pageHeadingAndTitle =
  'Does the destination premises have a county parish holding (CPH) number?'

class CPHYesNoPage extends YesNoRadioPage {
  pagePath = 'fmd/movement-destination/cph-number-yes-no'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'destinationHasACphNumber',
      noInputError:
        'Select if you know the CPH number for the destination premises'
    })
  }
}

export default new CPHYesNoPage()
