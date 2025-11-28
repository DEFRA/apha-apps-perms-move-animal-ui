import { EmailAddressAnswer } from '../email-address/email-address.js'

/** @import {TextConfig} from '../text/text.js' */

/**
 * export @typedef {string} OriginEmailAddressData
 * @typedef {{ originEmail: OriginEmailAddressData }} OriginEmailAddressPayload
 */

/**
 * @augments {EmailAddressAnswer}
 */
export class OriginEmailAddressAnswer extends EmailAddressAnswer {
  /** @type {TextConfig} */
  static config = {
    ...EmailAddressAnswer.config,
    payloadKey: 'originEmail',
    validation: {
      pattern: {
        regex: /** @type {RegExp} */ (
          EmailAddressAnswer.config.validation.pattern?.regex
        ),
        message: 'Enter the email address in a valid format'
      },
      maxLength: {
        value: /** @type {number} */ (
          EmailAddressAnswer.config.validation.maxLength?.value
        ),
        message: 'Your answer must be no longer than 255 characters'
      },
      empty: { message: 'Enter the email address for the origin premises' }
    }
  }

  get config() {
    return OriginEmailAddressAnswer.config
  }
}
