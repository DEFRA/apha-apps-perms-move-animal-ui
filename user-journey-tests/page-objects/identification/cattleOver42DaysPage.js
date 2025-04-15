/* eslint-disable lines-between-class-members */
import { YesNoRadioPage } from '../base-pages/yesNoRadioBase.js'

const pageId = 'animals42DaysOldOrOlder'
const pageHeadingAndTitle =
  'Are you also moving any animals 42 days old or older?'
const noInputError =
  'Select if you are also moving any animals 42 days old or older'

class CattleOver42DaysPage extends YesNoRadioPage {
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

export default new CattleOver42DaysPage()
