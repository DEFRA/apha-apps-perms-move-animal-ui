import { NotImplementedError } from '../../helpers/not-implemented-error.js'
import { createLogger } from '../../helpers/logging/logger.js'

/**
 * @import {Page} from '../../model/page/page-model.js'
 */

/**
 * export @interface PageController {
 *  handleGet: (req: Request, h: ResponseToolkit) => ResponseObject
 * }
 */

const logger = createLogger()

export default class GenericPageController {
  logger

  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page
    this.logger = logger.child({ controller: this.page.key })
  }

  getHandler(req, h) {
    return this.handleGet(req, h)
  }

  postHandler(req, h) {
    return this.handlePost(req, h)
  }

  /**
   * @param {import('../../model/answer/validation.js').AnswerErrors} errors
   */
  recordErrors(errors) {
    Object.entries(errors).forEach(([key, value]) => {
      this.sendErrorLog(key, value.text)
    })
  }

  /**
   * @param {string} field
   * @param {string} error
   */
  sendErrorLog(field, error) {
    this.logger.info(
      `User encountered a validation error on ${this.page.urlPath}, on the ${field} field : ${error}`
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleGet(_req, _h) {
    throw new NotImplementedError()
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handlePost(_req, _h) {
    throw new NotImplementedError()
  }
}
