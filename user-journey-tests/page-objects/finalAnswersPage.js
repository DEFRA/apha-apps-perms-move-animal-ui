import { selectElement } from '../helpers/page.js'
import { Page } from './page.js'

const pageHeadingAndTitle = 'Check your answers before sending your application'

const pageId = 'confirmation'

const valueElementFromChangeLink = (element) =>
  element.parentElement().parentElement().$('.govuk-summary-list__value')

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
    return valueElementFromChangeLink(this.onOffFarmChange)
  }

  get originTypeValue() {
    return valueElementFromChangeLink(this.originTypeChange)
  }

  get parishNumberValue() {
    return valueElementFromChangeLink(this.parishHoldingChange)
  }

  get addressValue() {
    return valueElementFromChangeLink(this.addressChange)
  }

  get movementDestinationVaue() {
    return valueElementFromChangeLink(this.movementDestinationChange)
  }

  get ownerNameValue() {
    return valueElementFromChangeLink(this.ownerNameChange)
  }

  get receiveMethodValue() {
    return valueElementFromChangeLink(this.receiveMethodChange)
  }

  get emailValue() {
    return valueElementFromChangeLink(this.emailChange)
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
