import { DestinationSection } from '../section/destination/destination.js'
import { LicenceSection } from '../section/licence/licence.js'
import { OriginSection } from '../section/origin/origin.js'
import { validateApplication } from './validation.js'

/**
 * export @typedef {{
 * origin: OriginData | undefined;
 * licence: LicenceData | undefined;
 * destination: DestinationData | undefined;
 * }} ApplicationData
 * @import {OriginData} from '../section/origin/origin.js'
 * @import {LicenceData} from '../section/licence/licence.js'
 * @import {DestinationData} from '../section/destination/destination.js'
 */

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

  /**
   * @param {ApplicationData | undefined} state
   * @returns {ApplicationModel}
   */
  static fromState(state) {
    return new ApplicationModel({
      origin: OriginSection.fromState(state?.origin),
      licence: LicenceSection.fromState(state?.licence),
      destination: DestinationSection.fromState(state?.destination)
    })
  }
}
