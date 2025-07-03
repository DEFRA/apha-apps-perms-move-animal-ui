/* eslint-disable lines-between-class-members */
import { YesNoRadioPage } from '../base-pages/yesNoRadioBase.js'

const pageId = 'manureAndSlurry'
const noInputError =
  'Select if manure or slurry has been put on the grazing field in the past 60 days'
const pageHeadingAndTitle =
  'Has any manure or slurry been put on the grazing field in the past 60 days?'

class ManureAndSlurryPage extends YesNoRadioPage {
  constructor() {
    super({
      pageId,
      noInputError
    })
  }

  pagePath = 'biosecurity/manure-and-slurry'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new ManureAndSlurryPage()
