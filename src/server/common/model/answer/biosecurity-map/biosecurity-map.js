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
 * }} BiosecurityMapData
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
 * @augments AnswerModel<BiosecurityMapPayload>
 */
export class BiosecurityAnswer extends AnswerModel {
  get value() {
    const value = {
      metadata: {
        uploadId: this._data?.metadata?.uploadId ?? '',
        uploadUrl: this._data?.metadata?.uploadUrl ?? '',
        statusUrl: this._data?.metadata?.statusUrl ?? ''
      }
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
    return {
      metadata: {
        uploadId: this._data?.metadata?.uploadId ?? '',
        uploadUrl: this._data?.metadata?.uploadUrl ?? '',
        statusUrl: this._data?.metadata?.statusUrl ?? ''
      },
      status: this._data?.status
    }
  }

  validate() {
    return validateAnswerAgainstSchema(validationSchema, {
      metadata: {
        uploadId: this._data?.metadata?.uploadId ?? '',
        uploadUrl: this._data?.metadata?.uploadUrl ?? '',
        statusUrl: this._data?.metadata?.statusUrl ?? ''
      }
    })
  }

  _extractFields({ metadata, status }) {
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
