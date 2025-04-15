/* eslint-disable lines-between-class-members */
import { YesNoRadioPage } from '../base-pages/yesNoRadioBase.js'

const pageId = 'calvesOver42DaysOld'
const pageHeadingAndTitle =
  'Are you also moving any animals 42 days old or older?'
const noInputError =
  'Select if you are also moving any animals 42 days old or older'

class Animals42DaysOldOrOlderPage extends YesNoRadioPage {
  constructor() {
    super({
      pageId,
      noInputError
    })
  }

  pagePath = 'identification/any-cattle-over-42-days'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new Animals42DaysOldOrOlderPage()
