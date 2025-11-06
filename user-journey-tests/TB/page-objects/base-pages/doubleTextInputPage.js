import { Page } from '../page.js'
import * as page from '../../helpers/page.js'

class DoubleTextInputPage extends Page {
  constructor({ firstId, lastId, input1Error, input2Error }) {
    super()
    this.firstId = firstId
    this.lastId = lastId
    this.input1Error = input1Error
    this.input2Error = input2Error
  }

  firstTextInput() {
    return super.getInputField(this.firstId)
  }

  lastTextInput() {
    return super.getInputField(this.lastId)
  }

  firstFieldError() {
    return super.getErrorElement(this.firstId)
  }

  lastFieldError() {
    return super.getErrorElement(this.lastId)
  }

  firstErrorLink() {
    return super.getErrorLink(this.firstId)
  }

  lastErrorLink() {
    return super.getErrorLink(this.lastId)
  }

  async inputTextAndContinue(first, last, nextPage) {
    await page.typeIntoElement(this.firstTextInput(), first)
    await page.typeIntoElement(this.lastTextInput(), last)
    await super.selectContinue()
    if (nextPage) await page.waitForPagePath(nextPage.pagePath)
  }

  async verifyFirstInputErrors(single = true) {
    if (single) {
      await super.selectContinue()
    }
    await super.verifyErrorsOnPage(this.firstFieldError(), this.input1Error)
    await super.verifySummaryErrorLink(
      this.firstErrorLink(),
      this.firstTextInput()
    )
  }

  async verifyLastInputErrors(single = true) {
    if (single) {
      await super.selectContinue()
    }
    await super.verifyErrorsOnPage(this.lastFieldError(), this.input2Error)
    await super.verifySummaryErrorLink(
      this.lastErrorLink(),
      this.lastTextInput()
    )
  }

  async inputErrorTest() {
    await super.selectContinue()
    await this.verifyFirstInputErrors(false)
    await this.verifyLastInputErrors(false)
  }
}

export { DoubleTextInputPage }
