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
 * export @typedef {{ metadata: {
 *   uploadId: string;
 *   uploadUrl: string;
 *   statusUrl: string;
 *  },
 *  status?: {
 *   uploadStatus: 'initiated' | 'pending' | 'ready',
 *   metadata: {},
 *   form: {
 *     crumb: string,
 *     file: any
 *   },
 *   numberOfRejectedFiles: number
 * } }} BiosecurityMapPayload
 */

/**
 * @augments AnswerModel<BiosecurityMapData>
 */
export class BiosecurityAnswer extends AnswerModel {
  /**
   * @returns {BiosecurityMapData}
   */
  get value() {
    if (!this._data?.metadata) {
      return undefined
    }

    const value = {
      metadata: {
        uploadId: this._data.metadata.uploadId,
        uploadUrl: this._data.metadata.uploadUrl,
        statusUrl: this._data.metadata.statusUrl
      },
      status: this._data?.status
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
    if (!this._data?.metadata) {
      return undefined
    }

    return {
      metadata: {
        uploadId: this._data.metadata.uploadId,
        uploadUrl: this._data.metadata.uploadUrl,
        statusUrl: this._data?.metadata?.statusUrl
      },
      status: this._data?.status
    }
  }

  validate() {
    return validateAnswerAgainstSchema(validationSchema, this.value)
  }

  /**
   * @param {BiosecurityMapPayload} payload
   */
  _extractFields(payload) {
    const { metadata, status } = payload
    return { metadata, status }
  }

  /**
   * @param {BiosecurityMapData | undefined} state
   * @returns {BiosecurityAnswer}
   */
  static fromState(state) {
    return new BiosecurityAnswer(state)
  }
}
