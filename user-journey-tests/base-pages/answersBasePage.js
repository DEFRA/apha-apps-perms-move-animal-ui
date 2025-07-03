import { Page } from '../TB/page-objects/page.js'

const keyElementFromChangeLink = (element) =>
  element.parentElement().parentElement().$('.govuk-summary-list__key')

const valueElementFromChangeLink = (element) =>
  element.parentElement().parentElement().$('.govuk-summary-list__value')

class AnswersBasePage extends Page {
  constructor(changeLinks) {
    super()
    this.changeLinks = changeLinks
  }

  getChangeLink(key) {
    return $(this.changeLinks[key])
  }

  getValue(key) {
    return valueElementFromChangeLink(this.getChangeLink(key))
  }

  getQuestion(key) {
    return keyElementFromChangeLink(this.getChangeLink(key))
  }
}

export { AnswersBasePage }
