import { RadioButtonBasePage } from '../../../base-pages/radioButtonBasePage.js'

const pageId = 'receiveMethod'
const pageHeadingAndTitle = 'How would you like this licence sent to you?'
const noInputError = 'Select how you would like this licence sent to you'
const valueArray = ['email', 'post']

class ReceiveMethodPage extends RadioButtonBasePage {
  constructor() {
    super({
      pageId,
      noInputError,
      valueArray
    })
  }

  pagePath = 'exotics/receiving-the-licence/email-or-post'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  async selectEmailAndContinue(nextPage) {
    await super.selectRadioAndContinue(valueArray[0], nextPage)
  }

  async selectPostAndContinue(nextPage) {
    await super.selectRadioAndContinue(valueArray[1], nextPage)
  }
}

export default new ReceiveMethodPage()
