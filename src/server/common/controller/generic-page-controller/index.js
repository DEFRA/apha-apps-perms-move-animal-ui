import {
  createMetricsLogger,
  Unit,
  StorageResolution
} from 'aws-embedded-metrics'
import { config } from '~/src/config/config.js'
import { NotImplementedError } from '../../helpers/not-implemented-error.js'

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

export default class GenericPageController {
  metrics = createMetricsLogger()

  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page
  }

  getHandler(req, h) {
    this.sendMetric('get', 'request')
    const result = this.handleGet(req, h)
    this.sendMetric('get', 'response')
    return result
  }

  postHandler(req, h) {
    this.sendMetric('post', 'request')
    const result = this.handlePost(req, h)
    this.sendMetric('post', 'response')
    return result
  }

  /**
   *
   * @param {import('../../model/answer/validation.js').AnswerErrors} errors
   */
  recordErrors(errors) {
    Object.entries(errors).forEach(([key, value]) => {
      this.sendErrorMetric(key, value.text)
    })
  }

  /**
   *
   * @param {string} method
   * @param {string} event
   */
  sendMetric(method, event) {
    if (!config.get('isProduction')) {
      return
    }

    const sendMetric = this.page.reportMetrics?.[method]?.[event]

    if (sendMetric) {
      this.metrics.putMetric(
        `${method}::${event}-${this.page.urlPath}`,
        1,
        Unit.Count,
        StorageResolution.Standard
      )
    }
  }

  /**
   *
   * @param {string} field
   * @param {string} error
   */
  sendErrorMetric(field, error) {
    if (!config.get('isProduction')) {
      return
    }

    this.metrics.putMetric(
      `${field} errored:${error}-${this.page.urlPath}`,
      1,
      Unit.Count,
      StorageResolution.Standard
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
