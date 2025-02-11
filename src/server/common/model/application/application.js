import { DestinationSection } from '../section/destination/destination.js'
import { LicenceSection } from '../section/licence/licence.js'
import { OriginSection } from '../section/origin/origin.js'
import { BiosecuritySection } from '../section/biosecurity/biosecurity.js'
import { validateApplication } from './validation.js'

/**
 * @import { Request } from '@hapi/hapi'
 * @import { RawApplicationState } from '../state/state-manager.js'
 */

/**
 * export @typedef {{
 * origin: OriginData | undefined;
 * licence: LicenceData | undefined;
 * destination: DestinationData | undefined;
 * biosecurity?: BiosecurityData | undefined;
 * }} ApplicationData
 * @import {OriginData} from '../section/origin/origin.js'
 * @import {LicenceData} from '../section/licence/licence.js'
 * @import {DestinationData} from '../section/destination/destination.js'
 * @import {BiosecurityData} from '../section/biosecurity/biosecurity.js'
 */

// This is a list of all the sections that are implemented in the application.
// The order in this array drives the order in which the sections are displayed.
const implementedSections = [
  OriginSection,
  DestinationSection,
  LicenceSection,
  BiosecuritySection
]

export class ApplicationModel {
  _data

  constructor(data) {
    this._data = data
    Object.seal(this)
  }

  validate() {
    return validateApplication(this._data)
  }

  /**
   * Getter for tasks.
   * @returns {Array | object} The data associated with each and every task in the application
   */
  get tasks() {
    return this._data
  }

  static get visibleSections() {
    return implementedSections.filter((section) => {
      return section.config.isVisible
    })
  }

  /**
   * @param {RawApplicationState} state
   * @returns {ApplicationModel}
   */
  static fromState(state) {
    return new ApplicationModel(
      Object.fromEntries(
        this.visibleSections.map((section) => [
          section.config.key,
          section.fromState(/** @type {any} */ (state[section.config.key]))
        ])
      )
    )
  }
}
