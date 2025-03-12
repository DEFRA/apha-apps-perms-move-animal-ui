/* eslint-disable lines-between-class-members */
import { YesNoRadioPage } from '../base-pages/yesNoRadioBase.js'

const pageId = 'animalsHoused'
const pageHeadingAndTitle = 'Will the incoming cattle be housed?'
const noInputError =
  'Select if the cattle will share any buildings with the resident herd'

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
