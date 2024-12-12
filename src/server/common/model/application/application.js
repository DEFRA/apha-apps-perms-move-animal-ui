import { Licence } from '../section/licence.js'
import { Origin } from '../section/origin.js'
import { validateApplication } from './validation.js'

/**
 * @import {SectionModel} from '../section/section-model/section-model.js'
 */

/**
 * export @typedef {{
 * origin: OriginData | undefined;
 * licence: LicenceData | undefined;
 * }} ApplicationData
 * @import {OriginData} from '../section/origin.js'
 * @import {LicenceData} from '../section/licence.js'
 * @import {AddressData} from '../answer/address.js'
 */

export class Application {
  _data

  constructor(data) {
    this._data = data
    Object.seal(this)
  }

  validate() {
    return validateApplication(this._data)
  }

  /**
   * @returns {Origin}
   */
  get origin() {
    return Origin.fromState(this._data.origin)
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */

  /**
   * @param {ApplicationData | undefined} state
   * @returns {Application}
   */
  static fromState(state) {
    return new Application({
      origin: Origin.fromState(state?.origin),
      licence: Licence.fromState(state?.licence)
    })
  }

  /* eslint-enable @typescript-eslint/no-unused-vars */
}
