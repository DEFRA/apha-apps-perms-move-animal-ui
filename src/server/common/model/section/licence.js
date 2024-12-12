import { SectionModel } from './section-model/section-model.js'
import { EmailAddress } from '../answer/email-address.js'

/**
 * export @typedef {{
 * emailAddress: EmailAddressData | undefined;
 * }} LicenceData
 * @import {EmailAddressData} from '../answer/email-address.js'
 */

export class Licence extends SectionModel {
  get emailAddress() {
    return this._data?.emailAddress
  }

  /**
   * @param {LicenceData | undefined} state
   * @returns {Licence}
   */
  static fromState(state) {
    return new Licence({
      emailAddress: EmailAddress.fromState(state?.emailAddress)
    })
  }
}
