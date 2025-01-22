import {
  createMetricsLogger,
  Unit,
  StorageResolution
} from 'aws-embedded-metrics'
import { config } from '~/src/config/config.js'
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

export default class GenericPageController {
  metrics = createMetricsLogger()
  logger = createLogger()

  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page
  }

  getHandler(req, h) {
    let served = true

    try {
      this.sendMetric('get', 'request')

      return this.handleGet(req, h)
    } catch (e) {
      this.logger.error(e)
      served = false
    } finally {
      if (served) {
        this.sendMetric('get', 'response')
      }
    }
  }

  postHandler(req, h) {
    let served = true

    try {
      this.sendMetric('post', 'request')

      return this.handlePost(req, h)
    } catch (e) {
      this.logger.error(e)
      served = false
    } finally {
      if (served) {
        this.sendMetric('post', 'response')
      }
    }
  }

  /**
   *
   * @param {string} method
   * @param {string} event
   */
  sendMetric(method, event) {
    if (!config.get('isProduction')) return

    const sendMetric = this.page.reportMetrics[method]?.[event]

    if (sendMetric) {
      this.metrics.putMetric(
        `${method}::${event}-${this.page.urlPath}`,
        1,
        Unit.Count,
        StorageResolution.Standard
      )
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleGet(req, h) {
    throw new Error('Method not implemented')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handlePost(req, h) {
    throw new Error('Method not implemented')
  }
}
