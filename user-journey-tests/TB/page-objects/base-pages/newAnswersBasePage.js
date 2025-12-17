import { Page } from '../page.js'

const rowFromChangeLink = (element) => element.parentElement().parentElement()

const keyElementFromChangeLink = (element) =>
  rowFromChangeLink(element).$('.govuk-summary-list__key')

const valueElementFromChangeLink = (element) =>
  rowFromChangeLink(element).$('.govuk-summary-list__value')

class NewAnswersBasePage extends Page {
  constructor(changeLinks = {}) {
    super()
    if (Object.keys(changeLinks).length) this.changeLinks = changeLinks
  }

  getChangeLink(key) {
    const selector = this.changeLinks?.[key]

    if (!selector) {
      throw new Error(
        `No change link selector configured for key "${key}". ` +
          `Available keys: ${Object.keys(this.changeLinks || {}).join(', ')}`
      )
    }

    return $(selector)
  }

  getValue(key) {
    return valueElementFromChangeLink(this.getChangeLink(key))
  }

  getQuestion(key) {
    return keyElementFromChangeLink(this.getChangeLink(key))
  }
}

export { NewAnswersBasePage }
