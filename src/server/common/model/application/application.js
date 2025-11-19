import { validateApplication } from '~/src/server/common/model/application/validation.js'
import { NotImplementedError } from '../../helpers/not-implemented-error.js'

/* eslint-disable jsdoc/require-returns-check */

/**
 * @import { SectionModelV1 } from '~/src/server/common/model/section/section-model/section-model-v1.js'
 * @import { RawApplicationState } from '~/src/server/common/model/state/state-manager.js'
 * @import { ApplicationValidationResult } from '~/src/server/common/model/application/validation.js'
 * @typedef { { [key: string]: SectionModelV1; } } ApplicationPayload
 */

export class ApplicationModel {
  /** @type {ApplicationPayload} */
  _data

  // This is a list of all the sections that are implemented in the application.
  // The order in this array drives the order in which the sections are displayed.
  /** @type {typeof SectionModelV1[]} */
  static implementedSections

  /** @returns {{ major: number, minor: number }} */
  get version() {
    throw new NotImplementedError()
  }

  /** @returns {string} */
  get journeyId() {
    throw new NotImplementedError()
  }

  /**
   * @param {ApplicationPayload} data
   */
  constructor(data) {
    this._data = data
    Object.seal(this)
  }

  /** @returns {ApplicationValidationResult} */
  validate() {
    return validateApplication(this._data)
  }

  /**
   * Getter for tasks.
   * @returns {ApplicationPayload} The data associated with each and every task in the application
   */
  get tasks() {
    return this._data
  }

  /**
   * @param {RawApplicationState} state
   */
  static async visibleSections(req, state) {
    const sectionVisibility = await Promise.all(this.implementedSections.map(async (section) => ({
      isVisible: await section.config.isVisible(state, req),
      section
    })))

    return sectionVisibility
      .filter(({ isVisible }) => isVisible)
      .map(({ section }) => section )
  }

  get caseManagementData() {
    const sections = this.tasks


    return {
      journeyVersion: this.version,
      journeyId: this.journeyId,
      sections: Object.values(sections).map((section) => section.sectionData)
    }
  }

  /**
   * @param {RawApplicationState} state
   * @returns {Promise<ApplicationModel>}
   */
  static async fromRequest(req, state) {
    return new this(
      Object.fromEntries(
        await Promise.all((await this.visibleSections(req, state)).map(async (section) => [
          section.config.key,
          await section.fromRequest(req, state)
        ]))
    ))
  }
}
