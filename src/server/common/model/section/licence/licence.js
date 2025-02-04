import { licence } from '~/src/server/licence/index.js'
import { SectionModel } from '../section-model/section-model.js'
import { fullNamePage } from '~/src/server/licence/fullName/index.js'

/**
 * export @typedef {{
 * emailAddress: EmailAddressData | undefined;
 * }} LicenceData
 * @import {EmailAddressData} from '../../answer/email/email-address.js'
 */

export class LicenceSection extends SectionModel {
  static config = {
    key: 'licence',
    title: 'Receiving the licence',
    plugin: licence,
    summaryLink: '/receiving-the-licence/check-answers',
    isEnabled: () => true,
    isVisible: true
  }

  static firstPageFactory = () => fullNamePage

  /**
   * @param {LicenceData | undefined} data
   */
  static fromState(data) {
    return SectionModel.fromState.call(this, data)
  }
}
