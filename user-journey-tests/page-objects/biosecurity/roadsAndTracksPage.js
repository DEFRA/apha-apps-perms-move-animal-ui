/* eslint-disable lines-between-class-members */
import { RadioButtonBasePage } from '../base-pages/radioButtonBasePage.js'

const pageId = 'roadsAndTracks'
const pageHeadingAndTitle =
  'Will the incoming cattle come into contact with any roads or tracks used by the existing cattle?'
const noInputError =
  'Select if the incoming cattle come into contact with any roads or tracks used by the existing cattle'
const valueArray = ['yes', 'no']

class RoadsAndTracksPage extends RadioButtonBasePage {
  constructor() {
    super({
      pageId,
      noInputError,
      valueArray
    })
  }

  pagePath = 'biosecurity/roads-and-tracks'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  async selectYesAndContinue(nextPage) {
    await super.selectRadioAndContinue(valueArray[0], nextPage)
  }

  async selectNoAndContinue(nextPage) {
    await super.selectRadioAndContinue(valueArray[1], nextPage)
  }

  async roadsAndTracksErrorTest() {
    super.radioErrorTest()
  }
}

export default new RoadsAndTracksPage()
