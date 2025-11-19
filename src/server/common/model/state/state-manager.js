import { QuestionPage } from '../page/question-page-model.js'

/** @import {Request} from "@hapi/hapi/lib/types/request.js" */
/** @import { AnswerModel } from "../answer/answer-model.js" */
/** @import { ExitPage } from '../page/exit-page-model.js' */

import { NotImplementedError } from '../../helpers/not-implemented-error.js'
import { SectionModel } from '../section/section-model/section-model.js'

/**
 * @typedef {Record<string, any>} RawSectionState
 * @typedef {Record<string, RawSectionState>} RawApplicationState
 */

export class StateManager {
  /** @returns {string} */
  get key() {
    return StateManager.key
  }

  // eslint-disable-next-line jsdoc/require-returns-check
  /** @returns {string} */
  static get key() {
    throw new NotImplementedError()
  }

  /** @param {Request} request */
  constructor(request) {
    this._request = request
  }

  /** @returns {RawApplicationState} */
  toState() {
    return this._request.yar.get(this.key) ?? {}
  }

  /** @param {SectionModel} section */
  setSection(section) {
    const currentApplicationState = this.toState()
    const sectionData = section.sectionData
    const sectionState = Object.fromEntries(sectionData.questionAnswers.map(questionData => [
      questionData.questionKey,
      questionData.answer.value
    ]))

    this._request.yar.set(this.key, {
      ...currentApplicationState,
      [sectionData.sectionKey]: sectionState
    })
  }

  /**
   * @param {QuestionPage|ExitPage} page
   * @param {AnswerModel<any> | undefined} answer
   */
  set(page, answer) {
    const currentApplicationState = this.toState()
    if (page instanceof QuestionPage) {
      this._request.yar.set(this.key, {
        ...currentApplicationState,
        [page.sectionKey]: {
          ...currentApplicationState[page.sectionKey],
          [page.questionKey]: answer ? answer.toState() : undefined
        }
      })
    }
  }
}
