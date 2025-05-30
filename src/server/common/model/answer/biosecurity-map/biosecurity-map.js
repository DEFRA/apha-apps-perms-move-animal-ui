import { AnswerModel } from '../answer-model.js'
import { validateAnswerAgainstSchema } from '../validation.js'
import { finalSchema, processingSchema } from './validation.js'

/**
 * @typedef {{
 *   uploadId: string;
 *   uploadUrl: string;
 *   statusUrl: string;
 * }} UploadMetadata
 * @typedef {{
 *   uploadStatus: 'initiated' | 'pending' | 'ready' | 'skipped',
 *   metadata: {},
 *   form: {
 *     crumb: string,
 *     file: any
 *   },
 *   numberOfRejectedFiles: number
 * }} UploadStatus
 * export @typedef {{
 *   metadata?: UploadMetadata
 *   status?: UploadStatus
 * }} BiosecurityMapData
 * export @typedef {{
 *   metadata?: UploadMetadata
 *   status?: UploadStatus
 * }} BiosecurityMapPayload
 */

const skippedMessage =
  'Missing biosecurity map. Applicant needs to email it to csc.tblicensing@apha.gov.uk'

/**
 * @augments AnswerModel<BiosecurityMapPayload>
 */
export class BiosecurityMapAnswer extends AnswerModel {
  /**
   * @returns { BiosecurityMapData | undefined }
   */
  get value() {
    if (!this._data?.metadata) {
      return undefined
    }

    return {
      metadata: this._data.metadata,
      status: this._data.status
    }
  }

  /** @type {String} */
  get type() {
    const type = 'file'
    return type
  }

  /**
   * @return {any}
   */
  get data() {
    return {
      type: this.type,
      value: {
        path: this._data?.status?.form.file.s3Key,
        skipped: this.isSkipped()
      },
      displayText: this.html
    }
  }

  get html() {
    if (this.isSkipped()) {
      return skippedMessage
    }
    return 'Map uploaded'
  }

  get emailHtml() {
    if (this.isSkipped()) {
      return skippedMessage
    }
    return ''
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
    return validateAnswerAgainstSchema(finalSchema, this.value)
  }

  validateProcessing() {
    return validateAnswerAgainstSchema(processingSchema, this.value)
  }

  /**
   *
   * @param { BiosecurityMapPayload } data
   * @returns { BiosecurityMapData }
   */
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

  isSkipped() {
    return this.value?.status?.uploadStatus === 'skipped'
  }
}
