import { SectionModel } from '../section-model/section-model.js'
import { fullNamePage } from '~/src/server/licence/fullName/index.js'

/**
 * export @typedef {{
 * emailAddress: EmailAddressData | undefined;
 * }} LicenceData
 * @import {EmailAddressData} from '../../answer/email/email-address.js'
 */

export class LicenceSection extends SectionModel {
  static firstPageFactory = () => fullNamePage

  /**
   * @param {LicenceData | undefined} data
   */
  static fromState(data) {
    return SectionModel.fromState.call(this, data)
  }

  buildGdsTaskDetails() {
    const sectionValidity = this.validate()
    return {
      title: 'Receiving the licence',
      initialLink:
        sectionValidity.firstInvalidPage?.urlPath ?? this.firstPage.urlPath,
      summaryLink: '/receiving-the-licence/check-answers',
      isValid: sectionValidity.isValid,
      isEnabled: true
    }
  }
}
