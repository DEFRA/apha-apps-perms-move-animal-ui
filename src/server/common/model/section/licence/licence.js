import { SectionModel } from '../section-model/section-model-updated.js'
import { emailAddressPage } from '~/src/server/licence/email-address/index.js'

/**
 * export @typedef {{
 * emailAddress: EmailAddressData | undefined;
 * }} LicenceData
 * @import {EmailAddressData} from '../../answer/email/email-address.js'
 */

export class LicenceSection extends SectionModel {
  firstPage = emailAddressPage

  get emailAddress() {
    return this._data?.emailAddress.answer
  }

  /**
   * @param {LicenceData | undefined} state
   * @returns {LicenceSection}
   */
  static fromState(state) {
    return new LicenceSection({
      emailAddress: {
        page: emailAddressPage,
        answer: emailAddressPage.Answer.fromState(state?.emailAddress)
      }
    })
  }
}
