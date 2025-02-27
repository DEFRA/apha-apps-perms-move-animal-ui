import { RadioButtonBasePage } from '../base-pages/radioButtonBasePage.js'

const pageId = 'quantityOptions'
const pageHeadingAndTitle = 'Will you move more than 75 animals?'
const noInputError = 'Select if you will move more than 75 animals'
const valueArray = ['yes', 'no', 'unknown']

class QuantityOptionsPage extends RadioButtonBasePage {
  constructor() {
    super({
      pageId,
      noInputError,
      valueArray
    })
  }

  pagePath = 'destination/quantity-options'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  async selectYesAndContinue(nextPage) {
    await super.selectRadioAndContinue(valueArray[0], nextPage)
  }

  async selectNoAndContinue(nextPage) {
    await super.selectRadioAndContinue(valueArray[1], nextPage)
  }

  async selectUnknownAndContinue(nextPage) {
    await super.selectRadioAndContinue(valueArray[2], nextPage)
  }

  async grazingErrorTest() {
    super.radioErrorTest()
  }
}

export default new QuantityOptionsPage()
