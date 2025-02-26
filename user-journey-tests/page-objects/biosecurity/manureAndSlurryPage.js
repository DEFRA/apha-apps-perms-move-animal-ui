/* eslint-disable lines-between-class-members */
import { RadioButtonBasePage } from '../base-pages/radioButtonBasePage.js'

const pageId = 'manureAndSlurry'
const noInputError =
  'Select if manure or slurry has been put on the grazing field in the past 60 days'
const valueArray = ['yes', 'no']
const pageHeadingAndTitle =
  'Has any manure or slurry been put on the grazing field in the past 60 days?'

class ManureAndSlurryPage extends RadioButtonBasePage {
  constructor() {
    super({
      pageId,
      noInputError,
      valueArray
    })
  }

  pagePath = 'biosecurity/manure-and-slurry'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  async selectYesAndContinue(nextPage) {
    await super.selectRadioAndContinue(valueArray[0], nextPage)
  }

  async selectNoAndContinue(nextPage) {
    await super.selectRadioAndContinue(valueArray[1], nextPage)
  }

  async grazingErrorTest() {
    super.radioErrorTest()
  }
}

export default new ManureAndSlurryPage()
