import { AnswerModel } from '../answer-model.js'
import { validateAnswerAgainstSchema } from '../validation.js'
import validationSchema from './validation.js'

/**
 * export @typedef {{
 *  metadata: {
 *   uploadId: string;
 *   uploadUrl: string;
 *   statusUrl: string;
 *  }
 * status?: {
 *   uploadStatus: 'initiated' | 'pending' | 'ready',
 *   metadata: {},
 *   form: {
 *     crumb: string,
 *     file: any
 *   },
 *   numberOfRejectedFiles: number
 * }
 * } | undefined} BiosecurityMapData
 *
 * export @typedef {{ biosecurityMap: BiosecurityMapData }} BiosecurityMapPayload
 */

/**
 * @augments AnswerModel<BiosecurityMapPayload>
 */
export class BiosecurityAnswer extends AnswerModel {
  /**
   * @returns {BiosecurityMapData}
   */
  get value() {
    if (!this._data?.biosecurityMap?.metadata) {
      return undefined
    }

    const { metadata, status } = this._data.biosecurityMap

    const value = {
      metadata: {
        uploadId: metadata.uploadId,
        uploadUrl: metadata.uploadUrl,
        statusUrl: metadata.statusUrl
      },
      status
    }

    return value
  }

  get html() {
    const html = 'biosecurity html'
    return html
  }

  /**
   * @returns {BiosecurityMapData | undefined}
   */
  toState() {
    if (!this._data?.biosecurityMap?.metadata) {
      return undefined
    }

    const { metadata, status } = this._data.biosecurityMap

    return {
      metadata: {
        uploadId: metadata.uploadId,
        uploadUrl: metadata.uploadUrl,
        statusUrl: metadata?.statusUrl
      },
      status
    }
  }

  validate() {
    return validateAnswerAgainstSchema(validationSchema, this.value)
  }

  _extractFields(payload) {
    const { metadata, status } = payload.biosecurityMap ?? {}
    return {
      biosecurityMap: { metadata, status }
    }
  }

  static fromState(state) {
    return new BiosecurityAnswer(state)
  }
}
