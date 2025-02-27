import { selectElement } from '../helpers/page.js'
import { Page } from './page.js'

const pageHeadingAndTitle = 'Check your answers before sending your application'

const valueIdentifier = '.govuk-summary-list__value'
const pageId = 'confirmation'

class FinalAnswersPage extends Page {
  pagePath = '/submit/check-answers'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
  errorMessage = 'You need to tick a declaration box'

  fieldError() {
    return super.getErrorElement(pageId)
  }

  summaryErrorLink() {
    return super.getErrorLink(pageId)
  }

  get onOffFarmValue() {
    return $$(valueIdentifier)[0]
  }

  get originTypeValue() {
    return $$(valueIdentifier)[1]
  }

  get parishNumberValue() {
    return $$(valueIdentifier)[2]
  }

  get addressValue() {
    return $$(valueIdentifier)[3]
  }

  get movementDestinationVaue() {
    return $$(valueIdentifier)[4]
  }

  get ownerNameValue() {
    return $$(valueIdentifier)[5]
  }

  get receiveMethodValue() {
    return $$(valueIdentifier)[6]
  }

  get emailValue() {
    return $$(valueIdentifier)[7]
  }

  get onOffFarmChange() {
    return $('[data-testid="onOffFarm-change-link"]')
  }

  get originTypeChange() {
    return $('[data-testid="originType-change-link"]')
  }

  get parishHoldingChange() {
    return $('[data-testid="cphNumber-change-link"]')
  }

  get addressChange() {
    return $('[data-testid="address-change-link"]')
  }

  get movementDestinationChange() {
    return $('[data-testid="destinationType-change-link"]')
  }

  get ownerNameChange() {
    return $('[data-testid="fullName-change-link"]')
  }

  get receiveMethodChange() {
    return $('[data-testid="receiveMethod-change-link"]')
  }

  get emailChange() {
    return $('[data-testid="emailAddress-change-link"]')
  }

  get confirmStatementsCheckbox() {
    return $('[data-testid="confirm-checkbox"]')
  }

  get someoneElseCheckbox() {
    return $('[data-testid="other-checkbox"]')
  }

  async selectADeclarationAndContinue(someoneElse = false) {
    if (!someoneElse) {
      await selectElement(this.confirmStatementsCheckbox, true)
    } else {
      await selectElement(this.someoneElseCheckbox, true)
    }
    await super.selectContinue()
  }

  async submissionErrorTest() {
    await super.selectContinue()
    await super.verifyErrorsOnPage(this.fieldError(), this.errorMessage)
    await super.verifySummaryErrorLink(
      this.summaryErrorLink(),
      this.confirmStatementsCheckbox
    )
  }
}

export default new FinalAnswersPage()
