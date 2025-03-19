import { Page } from '../page.js'

class AnswersBasePage extends Page {
  constructor(changeLinks) {
    super()
    this.changeLinks = changeLinks
  }

  keyElementFromChangeLink = (element) =>
    element.parentElement().parentElement().$('.govuk-summary-list__key')

  valueElementFromChangeLink = (element) =>
    element.parentElement().parentElement().$('.govuk-summary-list__value')

  getChangeLink(key) {
    return $(this.changeLinks[key])
  }

  getValue(key) {
    return this.valueElementFromChangeLink(this.getChangeLink(key))
  }

  getQuestion(key) {
    return this.keyElementFromChangeLink(this.getChangeLink(key))
  }
}

export { AnswersBasePage }
