import { RadioButtonBasePage } from '../base-pages/radioButtonBasePage.js'

const pageId = 'grazing'
const pageHeadingAndTitle = 'Will the incoming cattle be grazed?'
const noInputError = 'Select yes if the incoming cattle will be grazed'
const valueArray = ['yes', 'no']

class GrazingPage extends RadioButtonBasePage {
  constructor() {
    super({
      pageId,
      noInputError,
      valueArray
    })
  }

  pagePath = 'biosecurity/grazing'
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

export default new GrazingPage()
