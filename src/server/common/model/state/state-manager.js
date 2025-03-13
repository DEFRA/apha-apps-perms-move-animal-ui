/** @import {Request} from "@hapi/hapi/lib/types/request.js" */
/** @import { QuestionPage } from "../page/question-page-model.js" */
/** @import { AnswerModel } from "../answer/answer-model.js" */

/**
 * @typedef {Record<string, any>} RawSectionState
 * @typedef {Record<string, RawSectionState>} RawApplicationState
 */

const sectionKeys = [
  'origin',
  'destination',
  'licence',
  'identification',
  'biosecurity',
  'biosecurity-map'
]

export class StateManager {
  /** @param {Request} request */
  constructor(request) {
    this._request = request
  }

  /** @returns {RawApplicationState} */
  toState() {
    return Object.fromEntries(
      sectionKeys
        .map((key) => [key, this._request.yar.get(key)])
        .filter((entry) => entry.at(1) !== null)
    )
  }

  /**
   * @param {QuestionPage} page
   * @param {AnswerModel<any>} answer
   */
  set(page, answer) {
    this._request.yar.set(page.sectionKey, {
      ...this._request.yar.get(page.sectionKey),
      [page.questionKey]: answer.toState()
    })
  }
}
