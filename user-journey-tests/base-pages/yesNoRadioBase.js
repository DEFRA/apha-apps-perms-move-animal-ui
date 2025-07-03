import { RadioButtonBasePage } from '../base-pages/radioButtonBasePage.js'

const valueArray = ['yes', 'no', 'unknown']

class YesNoRadioPage extends RadioButtonBasePage {
  constructor({ pageId, noInputError }) {
    super({
      pageId,
      noInputError,
      valueArray
    })
  }

  async selectYesAndContinue(nextPage) {
    await super.selectRadioAndContinue(valueArray[0], nextPage)
  }

  async selectNoAndContinue(nextPage) {
    await super.selectRadioAndContinue(valueArray[1], nextPage)
  }

  async selectUnknownAndContinue(nextPage) {
    await super.selectRadioAndContinue(valueArray[2], nextPage)
  }
}

export { YesNoRadioPage }
