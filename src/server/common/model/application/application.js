import { DestinationSection } from '../section/destination/destination.js'
import { LicenceSection } from '../section/licence/licence.js'
import { OriginSection } from '../section/origin/origin.js'
import { BiosecuritySection } from '../section/biosecurity/biosecurity.js'
import { validateApplication } from './validation.js'
import { BiosecurityPlanSection } from '../section/biosecurity-plan/biosecurity-plan.js'

/**
 * @import { SectionModel } from '../section/section-model/section-model.js'
 * @import { RawApplicationState } from '../state/state-manager.js'
 * @import { ApplicationValidationResult } from './validation.js'
 * @typedef {{ [key: string]: SectionModel; }} ApplicationPayload
 * @typedef {{ application: ApplicationPayload }} ApplicationData
 */

export class ApplicationModel {
  /** @type {ApplicationData} */
  _data

  // This is a list of all the sections that are implemented in the application.
  // The order in this array drives the order in which the sections are displayed.
  /** @type {typeof SectionModel[]} */
  static implementedSections = [
    OriginSection,
    DestinationSection,
    LicenceSection,
    BiosecuritySection,
    BiosecurityPlanSection
  ]

  /**
   * @param {ApplicationPayload} data
   */
  constructor(data) {
    this._data = {
      application: data
    }
    Object.seal(this)
  }

  /** @returns {ApplicationValidationResult} */
  validate() {
    return validateApplication(this._data.application)
  }

  /**
   * Getter for tasks.
   * @returns {ApplicationPayload} The data associated with each and every task in the application
   */
  get tasks() {
    return this._data.application
  }

  /**
   * @param {RawApplicationState} state
   */
  static visibleSections(state) {
    return this.implementedSections.filter((section) => {
      return section.config.isVisible(state)
    })
  }

  /**
   * @param {RawApplicationState} state
   * @returns {ApplicationModel}
   */
  static fromState(state) {
    return new ApplicationModel(
      Object.fromEntries(
        this.visibleSections(state).map((section) => [
          section.config.key,
          section.fromState(state)
        ])
      )
    )
  }
}
