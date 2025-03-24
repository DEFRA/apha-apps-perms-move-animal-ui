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

  get html() {
    if (this.isSkipped()) {
      return 'Applicant must email their biosecurity map to csc.tblicensing@apha.gov.uk<br /><br />The application cannot be processed until it is received.'
    }
    return 'Map uploaded'
  }

  get emailHtml() {
    if (this.isSkipped()) {
      return 'Missing biosecurity map. Check the CSC TB licencing mailbox for an emailed version from the applicant.'
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
