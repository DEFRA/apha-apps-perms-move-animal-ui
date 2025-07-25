/* eslint-disable lines-between-class-members */
import { YesNoRadioPage } from '../base-pages/yesNoRadioBase.js'

const pageId = 'animalsHoused'
const pageHeadingAndTitle = 'Will the incoming animals be housed?'
const noInputError = 'Select if the animals will be housed'

class AnySharedBuildingsPage extends YesNoRadioPage {
  constructor() {
    super({
      pageId,
      noInputError
    })
  }

  pagePath = 'biosecurity/buildings-any-shared'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new AnySharedBuildingsPage()
