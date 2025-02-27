/* eslint-disable lines-between-class-members */
import { RadioButtonBasePage } from '../base-pages/radioButtonBasePage.js'

const pageHeadingAndTitle =
  'Will you separate the incoming cattle from the resident herd?'
const pageId = 'keptSeparately'
const noInputError = 'Select if the incoming cattle will be kept separately'
const valueArray = ['yes', 'no']

class KeptSeparatelyPage extends RadioButtonBasePage {
  constructor() {
    super({
      pageId,
      noInputError,
      valueArray
    })
  }

  pagePath = 'biosecurity/kept-separately'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  async selectYesAndContinue(nextPage) {
    await super.selectRadioAndContinue(valueArray[0], nextPage)
  }

  async selectNoAndContinue(nextPage) {
    await super.selectRadioAndContinue(valueArray[1], nextPage)
  }

  async keptSeparatelySelectionErrorTest() {
    super.radioErrorTest()
  }
}

export default new KeptSeparatelyPage()
