import { License } from '../section/license.js'
import { Origin } from '../section/origin.js'
import { validateApplication } from './validation.js'

/**
 * @import {SectionModel} from '../section/section-model.js'
 */

/**
 * export @typedef {{
 * origin: OriginData | undefined;
 * license: LicenseData | undefined;
 * }} ApplicationData
 * @import {OriginData} from '../section/origin.js'
 * @import {LicenseData} from '../section/license.js'
 * @import {AddressData} from '../answer/address.js'
 */

/**
 * @typedef {{[key:string]: SectionModel}} ApplicationPayload
 */

export class Application {
  /** @type {ApplicationPayload} */
  _data

  constructor(data) {
    this._data = data
    Object.seal(this)
  }

  validate() {
    return validateApplication(this._data)
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */

  /**
   * @param {ApplicationData | undefined} state
   * @returns {Application}
   */
  static fromState(state) {
    return new Application({
      origin: Origin.fromState(state?.origin),
      license: License.fromState(state?.license)
    })
  }

  /* eslint-enable @typescript-eslint/no-unused-vars */
}
