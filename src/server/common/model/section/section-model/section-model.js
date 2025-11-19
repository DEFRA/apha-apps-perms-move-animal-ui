import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { NotImplementedError } from '../../../helpers/not-implemented-error.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */
/** @import { Request } from '@hapi/hapi' */

/**
 * @import { Page } from '~/src/server/common/model/page/page-model.js'
 * @import {AnswerModel} from '~/src/server/common/model/answer/answer-model.js'
 * @import {RawApplicationState, StateManager} from '~/src/server/common/model/state/state-manager.js'
 */

/**
 * @typedef {{ kind: 'NonQuestion', page: Page }} NonQuestionPageAnswer
 * @typedef {{ kind: 'Question', page: QuestionPage, answer: AnswerModel }} QuestionPageAnswer
 * @typedef { (NonQuestionPageAnswer | QuestionPageAnswer)[] } SectionPayload
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
 * export @typedef {{ isValid: boolean, firstInvalidPage?: string }} SectionValidation
 */

export class SectionModel {
  /** @type {any} */
  _data

  /** @type {SectionConfig} */
  static config

  /**
   * @returns {SectionConfig}
   */
  get config() {
    return /** @type {any} */ (this.constructor).config
  }


  /** @param {any} data */
  constructor(data) {
    this._data = data
  }

  /** @returns {SectionValidation} */
  validate() {
    throw new NotImplementedError()
  }

  // eslint-disable-next-line jsdoc/require-returns-check
  /**
   * @param {RawApplicationState} applicationState
   * @returns {Promise<object>}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async taskDetailsViewModel(req, applicationState) {
    throw new NotImplementedError()
  }


  /**
   * @param {import("@hapi/hapi").Request} req
   * @param {RawApplicationState} state
   * @returns {Promise<SectionModel>}
   */
  static async fromRequest(req, state) {
    throw new NotImplementedError()
  }

  get sectionData() {
    throw new NotImplementedError()
  }

  /**
   * @param {Request} req
   * @param {string} redirectUri
   **/
  summaryViewModel(req, redirectUri) {
    throw new NotImplementedError()
  }

  // eslint-disable-next-line jsdoc/require-returns-check
  /**
   * @param {Request} req
   * @param {RawApplicationState} applicationState
   * @returns {Promise<object>}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async taskDetailsViewModel(req, applicationState) {
    throw new NotImplementedError()
  }
}
