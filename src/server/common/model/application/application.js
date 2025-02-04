import { DestinationSection } from '../section/destination/destination.js'
import { LicenceSection } from '../section/licence/licence.js'
import { OriginSection } from '../section/origin/origin.js'
import { validateApplication } from './validation.js'
import { FeatureFlagHelper } from '../../helpers/feature-flag.js'

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
      ...{
        origin: OriginSection.fromState(state?.origin),
        destination: DestinationSection.fromState(state?.destination),
        licence: LicenceSection.fromState(state?.licence)
      },
      ...FeatureFlagHelper.getAppplicationStatesBehindFeatureFlags(state)
    })
  }
}
