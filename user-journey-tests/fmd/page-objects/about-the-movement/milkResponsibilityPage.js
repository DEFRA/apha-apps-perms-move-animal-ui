import { YesNoRadioPage } from '../../../base-pages/yesNoRadioBase.js'

const pageHeadingAndTitle =
  'Are you responsible for organising the movement of the milk?'

class MilkResponsibilityPage extends YesNoRadioPage {
  pagePath = 'fmd/about-the-movement-or-activity/responsibility-for-movement'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'responsibleForMilkMovement',
      noInputError:
        'Select if you are responsible for organising the movement of the milk'
    })
  }
}

export default new MilkResponsibilityPage()
