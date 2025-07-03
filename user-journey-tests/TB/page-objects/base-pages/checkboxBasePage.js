import { selectElement, waitForPagePath } from '../../helpers/page.js'
import { Page } from '../page.js'

class CheckboxBasePage extends Page {
  constructor({ checkboxIds, pageId, noInputError }) {
    super()
    this.checkboxIds = checkboxIds
    this.pageId = pageId
    this.noInputError = noInputError

    // Dynamically create checkbox getters
    checkboxIds.forEach((id) => {
      Object.defineProperty(this, id, {
        get: function () {
          return $(`[data-testid="${id}-checkbox"]`)
        }
      })
    })
  }

  checkboxFieldError() {
    return super.getErrorElement(this.pageId)
  }

  summaryErrorLink() {
    return super.getErrorLink(this.pageId)
  }

  async selectCheckboxesAndContinue(checkboxIdsToSelect, nextPage) {
    for (const checkbox of checkboxIdsToSelect) {
      await selectElement(checkbox, true)
    }
    await super.selectContinue()
    if (nextPage) {
      await waitForPagePath(nextPage.pagePath)
    }
  }

  async verifyAllCheckboxesExist() {
    for (const id of this.checkboxIds) {
      await expect(this[id]).toBeExisting()
    }
  }

  async checkboxErrorTest(index) {
    if (!this.pageId || !this.noInputError) {
      throw new Error(
        'checkboxErrorTest requires pageId and noInputError to be defined'
      )
    }

    await super.selectContinue()
    await super.verifyErrorsOnPage(this.checkboxFieldError(), this.noInputError)
    const target = this[this.checkboxIds[index ?? 0]]
    await super.verifySummaryErrorLink(this.summaryErrorLink(), target)
  }
}

export { CheckboxBasePage }
