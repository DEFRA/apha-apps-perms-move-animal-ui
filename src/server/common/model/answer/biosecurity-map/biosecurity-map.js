import { AnswerModel } from '../answer-model.js'
import { validateAnswerAgainstSchema } from '../validation.js'
import validationSchema from './validation.js'

/**
 * @typedef {{
 *   uploadId: string;
 *   uploadUrl: string;
 *   statusUrl: string;
 * }} UploadMetadata
 *
 * @typedef {{
 *   uploadStatus: 'initiated' | 'pending' | 'ready',
 *   metadata: {},
 *   form: {
 *     crumb: string,
 *     file: any
 *   },
 *   numberOfRejectedFiles: number
 * }} UploadStatus
 */

/**
 * export @typedef {{
 *   metadata?: UploadMetadata
 *   status?: UploadStatus
 * }} BiosecurityMapData
 *
 * export @typedef {{
 *   metadata?: UploadMetadata
 *   status?: UploadStatus
 * }} BiosecurityMapPayload
 */

/**
 * @augments AnswerModel<BiosecurityMapPayload>
 */
export class BiosecurityMapAnswer extends AnswerModel {
  get value() {
    if (!this._data?.metadata) {
      return undefined
    }

    return {
      metadata: this._data.metadata,
      status: this._data.status
    }
  }

  get html() {
    const html = 'Map uploaded'
    return html
  }

  /**
   * @returns { BiosecurityMapData }
   */
  toState() {
    return {
      metadata: this._data?.metadata,
      status: this._data?.status
    }
  }

  validate() {
    return validateAnswerAgainstSchema(validationSchema, this.value)
  }

  _extractFields({ metadata, status }) {
    return { metadata, status }
  }

  /**
   * @param { BiosecurityMapData | undefined} state
   * @returns { BiosecurityMapAnswer }
   */
  static fromState(state) {
    return new BiosecurityMapAnswer(
      state ? { metadata: state.metadata, status: state.status } : undefined
    )
  }
}
