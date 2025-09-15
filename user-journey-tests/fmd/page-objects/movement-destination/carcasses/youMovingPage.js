import { YesNoRadioPage } from '../../../../base-pages/yesNoRadioBase.js'

const pageHeadingAndTitle = 'Are you moving the carcasses?'

class WholeAnimalYesNoPage extends YesNoRadioPage {
  pagePath = 'fmd/movement-destination/business-receiving-the-licence'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'applicantMovingCarcasses',
      noInputError: 'Select if you are moving the carcasses'
    })
  }
}

export default new WholeAnimalYesNoPage()
