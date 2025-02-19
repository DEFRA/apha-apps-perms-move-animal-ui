import { NotImplementedError } from '../../helpers/not-implemented-error.js'
import { Page } from './page-model.js'

/** @import { AnswerModel, AnswerModelClass } from '../answer/answer-model.js' */
/** @import { AnswerErrors } from "~/src/server/common/model/answer/validation.js" */
/** @import { RawApplicationState } from '../state/state-manager.js' */

/**
 * @template AnswerPayload
 * @class QuestionPage<AnswerPayload>
 */
export class QuestionPage extends Page {
  /** @type {string} */
  question

  /** @type {string} */
  questionKey

  /** @type {AnswerModelClass<AnswerPayload>} */
  Answer

  view = 'common/model/page/question-page.njk'

  /** @returns {string} */
  get heading() {
    return this.question
  }

  /** @returns {string} */
  get title() {
    return this.question
  }

  // eslint-disable-next-line jsdoc/require-returns-check
  /**
   * @param {AnswerModel} _answer
   * @param {RawApplicationState} [_context]
   * @returns {Page | QuestionPage}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nextPage(_answer, _context) {
    throw new NotImplementedError()
  }
}
