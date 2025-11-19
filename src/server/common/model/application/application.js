import { validateApplication } from '~/src/server/common/model/application/validation.js'
import { NotImplementedError } from '../../helpers/not-implemented-error.js'

/* eslint-disable jsdoc/require-returns-check */

/**
 * @import { SectionModelV1 } from '~/src/server/common/model/section/section-model/section-model.js'
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
  static visibleSections(state) {
    return this.implementedSections.filter((section) => {
      return section.config.isVisible(state)
    })
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
        await Promise.all(this.visibleSections(state).map(async (section) => [
          section.config.key,
          await section.fromRequest(req, state)
        ]))
    ))
  }

  /**
   * @param {RawApplicationState} state
   * @returns {ApplicationModel}
   */
  static fromState(state) {
    return new this(
      Object.fromEntries(
        this.visibleSections(state).map((section) => [
          section.config.key,
          section.fromState(state)
        ])
      )
    )
  }
}
