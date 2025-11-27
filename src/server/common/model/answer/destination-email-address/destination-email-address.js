import { EmailAddressAnswer } from '../email-address/email-address.js'

/** @import {TextConfig} from '../text/text.js' */

/**
 * export @typedef {string} DestinationEmailAddressData
 * @typedef {{ destinationEmail: DestinationEmailAddressData }} DestinationEmailAddressPayload
 */

/**
 * @augments {EmailAddressAnswer}
 */
export class DestinationEmailAddressAnswer extends EmailAddressAnswer {
  /** @type {TextConfig} */
  static config = {
    ...EmailAddressAnswer.config,
    payloadKey: 'destinationEmail',
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
      empty: { message: 'Enter your email address' }
    }
  }

  get config() {
    return DestinationEmailAddressAnswer.config
  }
}
