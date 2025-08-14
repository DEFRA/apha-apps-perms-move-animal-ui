import { NotImplementedError } from '../../helpers/not-implemented-error.js'
import { QuestionPage } from './question-page-model.js'

/** @import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi' */

/**
 * @template AnswerPayload
 * @class QuestionPage<AnswerPayload>
 */

export class AutocompletePage extends QuestionPage {
  /**
   * @param {Request} _req
   * @param {ResponseToolkit} _h
   * @returns {ResponseObject}
   */
  // eslint-disable-next-line jsdoc/require-returns-check, @typescript-eslint/no-unused-vars
  itemHandler(_req, _h) {
    throw new NotImplementedError()
  }
}
