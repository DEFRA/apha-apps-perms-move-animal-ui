import { SectionModel } from './section-model.js'
import { EmailAddress } from '../answer/email-address.js'
import { EmailAddressPage } from '../../../licence/email-address/index.js'
import { LicenceCheckAnswersPage } from '../../../licence/check-answers/index.js'

/**
 * export @typedef {{
 * emailAddress: EmailAddressData | undefined;
 * }} LicenceData
 * @import {EmailAddressData} from '../answer/email-address.js'
 */

export class Licence extends SectionModel {
  title = 'Receiving the licence'
  initialPage = new EmailAddressPage()
  summaryPageLink = new LicenceCheckAnswersPage().urlPath

  get isEnabled() {
    const isEnabled = true
    return isEnabled
  }

  get emailAddress() {
    return this._data?.emailAddress
  }

  /**
   * @param {LicenceData | undefined} state
   * @returns {Licence}
   */
  static fromState(state) {
    const instance = new Licence({
      emailAddress: EmailAddress.fromState(state?.emailAddress)
    })
    instance.seal()
    return instance
  }
}
