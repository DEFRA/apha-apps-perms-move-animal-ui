import { Page } from '../page.js'
import {
  valueElementFromChangeLink,
  keyElementFromChangeLink
} from '../../helpers/page.js'

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
