import { SectionModel } from './section-model.js'
import { EmailAddress } from '../answer/email-address.js'

/**
 * export @typedef {{
 * emailAddress: EmailAddressData | undefined;
 * }} LicenseData
 * @import {EmailAddressData} from '../answer/email-address.js'
 */

export class License extends SectionModel {
  get emailAddress() {
    return this._data?.emailAddress
  }

  /**
   * @param {LicenseData | undefined} state
   * @returns {License}
   */
  static fromState(state) {
    return new License({
      emailAddress: EmailAddress.fromState(state?.emailAddress)
    })
  }
}
