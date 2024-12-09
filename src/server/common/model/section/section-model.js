import { NotImplementedError } from '../../helpers/not-implemented-error.js'
import { validateSection } from './validation.js'

/**
 * @import {AnswerModel} from '../answer/answer-model.js'
 */

/**
 * @typedef {{[key:string]: AnswerModel}} SectionPayload
 */

export class SectionModel {
  /** @type {SectionPayload} */
  _data

  constructor(data) {
    this._data = data
    Object.seal(this)
  }

  validate() {
    return validateSection(this._data)
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */

  /**
   * @param {unknown} _data
   * @returns {unknown}
   */
  static fromState(_data) {
    throw new NotImplementedError()
  }

  /* eslint-enable @typescript-eslint/no-unused-vars */
}
