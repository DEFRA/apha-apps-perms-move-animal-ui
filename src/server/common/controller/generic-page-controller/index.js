import { config } from '~/src/config/config.js'
import { NotImplementedError } from '../../helpers/not-implemented-error.js'
import { createLogger } from '../../helpers/logging/logger.js'

/**
 * @import {Page} from '../../model/page/page-model.js'
 */

/**
 * export @interface PageController {
 *  handleGet: (req: Request, h: ResponseToolkit) => ResponseObject
 * }
 *
 * export @typedef {{
 *   request ?: boolean;
 *   response ?: boolean;
 * }} Metrics
 *
 * export @typedef {{
 *   get ?: Metrics;
 *   post ?: Metrics;
 * }} MetricReports
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
    this.sendLog('get', 'request')
    const result = this.handleGet(req, h)
    this.sendLog('get', 'response')
    return result
  }

  postHandler(req, h) {
    this.sendLog('post', 'request')
    const result = this.handlePost(req, h)
    this.sendLog('post', 'response')
    return result
  }

  /**
   *
   * @param {import('../../model/answer/validation.js').AnswerErrors} errors
   */
  recordErrors(errors) {
    Object.entries(errors).forEach(([key, value]) => {
      this.sendErrorLog(key, value.text)
    })
  }

  /**
   *
   * @param {string} method
   * @param {string} event
   */
  sendLog(method, event) {
    const sendMetric = this.page.reportMetrics?.[method]?.[event]

    if (sendMetric) {
      this.logger.info(`${method}::${event}-${this.page.urlPath}`)
    }
  }

  /**
   *
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
