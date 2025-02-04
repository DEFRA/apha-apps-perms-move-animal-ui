import { DestinationSection } from '../section/destination/destination.js'
import { LicenceSection } from '../section/licence/licence.js'
import { OriginSection } from '../section/origin/origin.js'
import { BiosecuritySection } from '../section/biosecurity/biosecurity.js'
import { validateApplication } from './validation.js'

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
   * @param {ApplicationData | undefined} state
   * @returns {ApplicationModel}
   */
  static fromState(state) {
    return new ApplicationModel(
      this.visibleSections.reduce((acc, section) => {
        acc[section.config.title] = section.fromState(
          state?.[section.config.key]
        )
        return acc
      }, {})
    )
  }
}
