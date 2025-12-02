import { NotImplementedError } from '../../../helpers/not-implemented-error.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 * @import { Request } from '@hapi/hapi'
 * @import { AnswerData }  from '~/src/server/common/model/answer/answer-model.js'
 * @import { RawApplicationState } from '~/src/server/common/model/state/state-manager.js'
 * @import { QuestionPageAnswer, NonQuestionPageAnswer } from './section-model-v1.js'
 */

/**
 * @typedef { (NonQuestionPageAnswer | QuestionPageAnswer)[] } SectionPayload
 * @typedef {{
 *  question: string,
 *  questionKey: string,
 *  answer: AnswerData
 * }} QuestionAnswer
 * @typedef {{
 *  sectionKey: string,
 *  title: string,
 *  questionAnswers: QuestionAnswer[]
 * }} SectionData
 */

/**
 * @typedef {{
 *  key: string,
 *  title: string,
 *  plugin?: ServerRegisterPluginObject<void>,
 *  summaryLink: string,
 *  isEnabled: (app: RawApplicationState, req?: Request) => Promise<boolean> | boolean,
 *  isVisible: (app: RawApplicationState, req?: Request) => Promise<boolean> | boolean
 * }} SectionConfig
 */

/**
 * export @typedef {{ isValid: boolean, firstInvalidPageUrl?: string }} SectionValidation
 */

export class SectionModel {
  /** @type {SectionPayload} */
  _data

  /** @type {SectionConfig} */
  static config

  /**
   * @returns {SectionConfig}
   */
  get config() {
    return /** @type {any} */ (this.constructor).config
  }

  // eslint-disable-next-line jsdoc/require-returns-check
  /** @returns {QuestionPageAnswer[]} */
  get _questionPageAnswers() {
    throw new NotImplementedError()
  }

  /** @param {SectionPayload} data */
  constructor(data) {
    this._data = data
  }

  // eslint-disable-next-line jsdoc/require-returns-check
  /** @returns {SectionValidation} */
  validate() {
    throw new NotImplementedError()
  }

  // eslint-disable-next-line jsdoc/require-returns-check
  /**
   * @param {RawApplicationState} _applicationState
   * @returns {object}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  taskDetailsViewModel(_applicationState) {
    throw new NotImplementedError()
  }

  // eslint-disable-next-line jsdoc/require-returns-check
  /**
   * @param {RawApplicationState} _state
   * @returns {SectionModel}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static fromState(_state) {
    throw new NotImplementedError()
  }

  // eslint-disable-next-line jsdoc/require-returns-check
  /**
   * @param {RawApplicationState} _state
   * @returns {SectionModel}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
  static fromRequest(_state) {
    throw new NotImplementedError()
  }

  // eslint-disable-next-line jsdoc/require-returns-check
  /** @returns {SectionData} */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  get sectionData() {
    throw new NotImplementedError()
  }

  /**
   * @param {Request} _req
   * @param {string} _redirectUri
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  summaryViewModel(_req, _redirectUri) {
    throw new NotImplementedError()
  }
}
