/** @import {Request} from "@hapi/hapi/lib/types/request.js" */
/** @import { QuestionPage } from "../page/question-page-model.js" */
/** @import { AnswerModel } from "../answer/answer-model.js" */

/**
 * @typedef {Record<string, any>} RawSectionState
 * @typedef {Record<string, RawSectionState>} RawApplicationState
 */

export class StateManager {
  /** @param {Request} request */
  constructor(request) {
    this._request = request
  }

  /** @returns {RawApplicationState} */
  toState() {
    return this._request.yar.get('application') ?? {}
  }

  /**
   * @param {QuestionPage} page
   * @param {AnswerModel<any> | undefined} answer
   */
  set(page, answer) {
    const currentApplicationState = this.toState()
    this._request.yar.set('application', {
      ...currentApplicationState,
      [page.sectionKey]: {
        ...currentApplicationState[page.sectionKey],
        [page.questionKey]: answer ? answer.toState() : undefined
      }
    })
  }
}
