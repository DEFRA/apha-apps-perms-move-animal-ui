import { Page } from '../page.js'

const emailId = 'receiveMethod'
const postId = 'post'
const pageHeadingAndTitle = 'How would you like this licence sent to you?'

class ReceiveMethodPage extends Page {
  pagePath = '/receiving-the-licence/licence-email-or-post'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
  noSelectionError = 'Select how you would like this licence sent to you'

  get emailRadio() {
    return super.getInputField(emailId)
  }

  get postRadio() {
    return super.getInputField(postId)
  }

  get receiveMethodRadioError() {
    return super.getErrorElement(emailId)
  }

  get receiveMethodSummaryErrorLink() {
    return super.getErrorLink(emailId)
  }

  async selectEmailAndContinue() {
    await super.selectRadioAndContinue(this.emailRadio)
  }

  async selectPostAndContinue() {
    await super.selectRadioAndContinue(this.postRadio)
  }

  async receiveMethodErrorTest() {
    await super.selectContinue()
    await super.verifyErrorsOnPage(
      this.receiveMethodRadioError,
      this.noSelectionError
    )
    await super.verifySummaryErrorLink(
      this.receiveMethodSummaryErrorLink,
      this.emailRadio
    )
  }
}

export default new ReceiveMethodPage()
