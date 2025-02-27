/* eslint-disable lines-between-class-members */
import { YesNoRadioPage } from '../base-pages/yesNoRadioBase.js'

const pageId = 'roadsAndTracks'
const pageHeadingAndTitle =
  'Will the incoming cattle come into contact with any roads or tracks used by the existing cattle?'
const noInputError =
  'Select if the incoming cattle come into contact with any roads or tracks used by the existing cattle'

class RoadsAndTracksPage extends YesNoRadioPage {
  constructor() {
    super({
      pageId,
      noInputError
    })
  }

  pagePath = 'biosecurity/roads-and-tracks'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new RoadsAndTracksPage()
