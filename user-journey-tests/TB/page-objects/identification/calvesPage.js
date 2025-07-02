/* eslint-disable lines-between-class-members */
import { YesNoRadioPage } from '../base-pages/yesNoRadioBase.js'

const pageId = 'calvesUnder42DaysOld'
const pageHeadingAndTitle = 'Will you move any calves under 42 days old?'
const noInputError = 'Select if you will move any calves under 42 days old'

class CalvesPage extends YesNoRadioPage {
  constructor() {
    super({
      pageId,
      noInputError
    })
  }

  pagePath = 'identification/any-calves'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new CalvesPage()
