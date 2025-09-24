import { YesNoRadioPage } from '../../../../base-pages/yesNoRadioBase.js'

const pageHeadingAndTitle =
  'Will the movement be repeated within a 2 week period?'

class MovementRepeatedPage extends YesNoRadioPage {
  pagePath = 'fmd/movement-details/repeat-movement'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'twoWeekRepeat',
      noInputError:
        'Select if the movement will be repeated within a 2 week period'
    })
  }
}

export default new MovementRepeatedPage()
