import { destination } from 'pino'
import { DestinationSection } from '../section/destination/destination.js'
import { LicenceSection } from '../section/licence/licence.js'
import { OriginSection } from '../section/origin/origin.js'
import { validateApplication } from './validation.js'

/**
 * @import {SectionModel} from '../section/section-model/section-model.js'
 */

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
   * @returns {OriginSection}
   */
  get origin() {
    return OriginSection.fromState(this._data.origin)
  }

  /**
   * @returns {LicenceSection}
   */
  get licence() {
    return LicenceSection.fromState(this._data.licence)
  }

  /**
   * @returns {DestinationSection}
   */
  get destination() {
    return DestinationSection.fromState(this._data.destination)
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */

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

  /* eslint-enable @typescript-eslint/no-unused-vars */
}
