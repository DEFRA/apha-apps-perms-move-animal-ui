import { SectionModel } from '../section/section-model/index.js'
import { emailAddressPage } from '~/src/server/licence/email-address/index.js'

/**
 * export @typedef {{
 * emailAddress: EmailAddressData | undefined;
 * }} LicenceData
 * @import {EmailAddressData} from '../answer/email/email-address.js'
 */

export class Licence extends SectionModel {
  firstPage = emailAddressPage

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
        page: emailAddressPage,
        answer: emailAddressPage.Answer.fromState(state?.emailAddress)
      }
    })
  }
}
