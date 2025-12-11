import { NotImplementedError } from '../../../helpers/not-implemented-error.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 * @import { Request } from '@hapi/hapi'
 * @import { AnswerData }  from '~/src/server/common/model/answer/answer-model.js'
 * @import { RawApplicationState } from '~/src/server/common/model/state/state-manager.js'
 * @import { QuestionPageAnswer, NonQuestionPageAnswer } from './section-model-v1.js'
 * @import { FormContext } from "@defra/forms-engine-plugin/engine/types.js"
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
  /** @type {SectionPayload | FormContext} */
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

  /** @param {SectionPayload | FormContext} data */
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
   * @param {Request} _req
   * @param {RawApplicationState} _applicationState
   * @returns {Promise<object>}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
  async taskDetailsViewModel(_req, _applicationState) {
    throw new NotImplementedError()
  }

  // eslint-disable-next-line jsdoc/require-returns-check
  /**
   * @param {Request} _req
   * @param {RawApplicationState} _state
   * @returns {Promise<SectionModel>}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
  static async fromRequest(_req, _state) {
    throw new NotImplementedError()
  }

  // eslint-disable-next-line jsdoc/require-returns-check
  /**
   * @param {RawApplicationState} _data
   * @returns {SectionModel}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static fromState(_data) {
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
