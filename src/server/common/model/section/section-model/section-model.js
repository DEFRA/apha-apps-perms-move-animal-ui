import { NotImplementedError } from '../../../helpers/not-implemented-error.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 * @import { Request } from '@hapi/hapi'
 * @import { Page } from '~/src/server/common/model/page/page-model.js'
 * @import { AnswerData, AnswerModel}  from '~/src/server/common/model/answer/answer-model.js'
 * @import { RawApplicationState } from '~/src/server/common/model/state/state-manager.js'
 * @import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
 */

/**
 * @typedef {{ kind: 'NonQuestion', page: Page }} NonQuestionPageAnswer
 * @typedef {{ kind: 'Question', page: QuestionPage, answer: AnswerModel }} QuestionPageAnswer
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
   * @param {RawApplicationState} applicationState
   * @returns {object}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  taskDetailsViewModel(applicationState) {
    throw new NotImplementedError()
  }

  /**
   * @param {RawApplicationState} state
   * @returns {SectionModel}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static fromState(state) {
    throw new NotImplementedError()
  }

  // eslint-disable-next-line jsdoc/require-returns-check
  /**
   * @param {import("@hapi/hapi").Request} req
   * @param {RawApplicationState} state
   * @returns {Promise<SectionModel>}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static async fromRequest(req, state) {
    throw new NotImplementedError()
  }

  // eslint-disable-next-line jsdoc/require-returns-check
  /** @returns {SectionData} */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  get sectionData() {
    throw new NotImplementedError()
  }

  /**
   * @param {Request} req
   * @param {string} redirectUri
   **/
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  summaryViewModel(req, redirectUri) {
    throw new NotImplementedError()
  }
}
