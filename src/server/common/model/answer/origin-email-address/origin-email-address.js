import { BaseEmailAddressAnswer } from '../base-email-address/base-email-address.js'

/** @import {TextConfig} from '../text/text.js' */

/**
 * export @typedef {string} OriginEmailAddressData
 * @typedef {{ originEmail: OriginEmailAddressData }} OriginEmailAddressPayload
 */

/**
 * @augments {BaseEmailAddressAnswer}
 */
export class OriginEmailAddressAnswer extends BaseEmailAddressAnswer {
  /** @type {TextConfig} */
  static config = {
    ...BaseEmailAddressAnswer.config,
    payloadKey: 'originEmail',
    validation: {
      ...BaseEmailAddressAnswer.config.validation,
      empty: { message: 'Enter the email address for the origin premises' }
    }
  }

  get config() {
    return OriginEmailAddressAnswer.config
  }
}
