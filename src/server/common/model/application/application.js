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
 * }} ApplicationData
 * @import {OriginData} from '../section/origin/origin.js'
 * @import {LicenceData} from '../section/licence/licence.js'
 * @import {AddressData} from '../answer/address/address.js'
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

  /* eslint-disable @typescript-eslint/no-unused-vars */

  /**
   * @param {ApplicationData | undefined} state
   * @returns {Application}
   */
  static fromState(state) {
    return new Application({
      origin: OriginSection.fromState(state?.origin),
      licence: LicenceSection.fromState(state?.licence)
    })
  }

  /* eslint-enable @typescript-eslint/no-unused-vars */
}
