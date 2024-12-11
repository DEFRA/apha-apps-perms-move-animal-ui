import { NotImplementedError } from '../../helpers/not-implemented-error.js'
import { Page } from '../page/page-model.js'
import { QuestionPage } from '../page/question-page-model.js'
import { validateSection } from './validation.js'

/**
 * @import {AnswerModel} from '../answer/answer-model.js'
 */

/**
 * @typedef {{ page: Page, answer: AnswerModel }} PageAnswer
 * @typedef {PageAnswer[]} SectionPayload
 */

/**
 * @typedef {{ isValid: boolean, firstInvalidPage?: Page }} SectionValidation
 */

export class SectionModelUpdated {
  /** @type {SectionPayload} */
  _data

  /** @type {QuestionPage} */
  static firstPage

  constructor(data) {
    this._data = data
  }

  get value(){
    return this._data
  }

  /** @returns {SectionValidation} */
  validate() {
    for (let { page, answer } of this._data) {
      if (!answer.validate().isValid) {
        return { isValid: false, firstInvalidPage: page }
      }
    }
    return { isValid: true }
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */

  /**
   * @param {object} data
   * @returns {SectionModelUpdated}
   */
  static fromState(data) {
    const pageAnswers = []

    /** @type {Page} */
    let page = this.firstPage

    while (page instanceof QuestionPage) {
      const answer = page.Answer.fromState(data[page.questionKey])

      pageAnswers.push({
        page: page,
        answer: answer
      })

      if (!answer.validate().isValid) {
        break;
      }
      page = page.nextPage(answer)
    }

    return new this(pageAnswers)
  }

  /* eslint-enable @typescript-eslint/no-unused-vars */
}
