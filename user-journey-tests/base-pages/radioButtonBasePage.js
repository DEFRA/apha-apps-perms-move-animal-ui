import { Page } from '../TB/page-objects/page.js'
import { waitForPagePath } from '../TB/helpers/page.js'

class RadioButtonBasePage extends Page {
  constructor({ pageId, noInputError, valueArray }) {
    super()
    this.pageId = pageId
    this.noInputError = noInputError
    this.valueArray = valueArray

    // Dynamically create getters for each radio button in valueArray
    valueArray.forEach((value) => {
      Object.defineProperty(this, `${value}Radio`, {
        get: function () {
          return $(`input[value="${value}"]`)
        }
      })
    })
  }

  radioFieldError() {
    return super.getErrorElement(this.pageId)
  }

  summaryErrorLink() {
    return super.getErrorLink(this.pageId)
  }

  async selectRadioAndContinue(option, nextPage) {
    await super.selectRadioAndContinue(this[`${option}Radio`])
    await waitForPagePath(nextPage.pagePath)
  }

  async radioErrorTest(index) {
    await super.selectContinue()
    await super.verifyErrorsOnPage(this.radioFieldError(), this.noInputError)
    if (!index) {
      await super.verifySummaryErrorLink(
        this.summaryErrorLink(),
        this[`${this.valueArray[0]}Radio`]
      )
    } else {
      await super.verifySummaryErrorLink(
        this.summaryErrorLink(),
        this[`${this.valueArray[index]}Radio`]
      )
    }
  }
}

export { RadioButtonBasePage }
