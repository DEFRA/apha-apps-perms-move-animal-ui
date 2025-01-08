import { SectionModel } from '../section-model/section-model.js'
import { receiveMethodPage } from '~/src/server/licence/receiveMethod/index.js'

/**
 * export @typedef {{
 * emailAddress: EmailAddressData | undefined;
 * }} LicenceData
 * @import {EmailAddressData} from '../../answer/email/email-address.js'
 */

export class LicenceSection extends SectionModel {
  static firstPageFactory = () => receiveMethodPage

  /**
   * @param {LicenceData | undefined} data
   */
  static fromState(data) {
    return SectionModel.fromState.call(this, data)
  }
}
