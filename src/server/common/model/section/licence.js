import { SectionModel } from '../section/section-model/index.js'
import { EmailAddress } from '../answer/email-address.js'
import { EmailAddressPage } from '~/src/server/licence/email-address/index.js'

/**
 * export @typedef {{
 * emailAddress: EmailAddressData | undefined;
 * }} LicenceData
 * @import {EmailAddressData} from '../answer/email-address.js'
 */

export class Licence extends SectionModel {
  firstPage = new EmailAddressPage()

  get emailAddress() {
    return this._data?.emailAddress.answer
  }

  /**
   * @param {LicenceData | undefined} state
   * @returns {Licence}
   */
  static fromState(state) {
    return new Licence({
      emailAddress: {
        page: new EmailAddressPage(),
        answer: EmailAddress.fromState(state?.emailAddress)
      }
    })
  }
}
