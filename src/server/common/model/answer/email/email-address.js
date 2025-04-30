import { config } from '~/src/config/config.js'
import { TextAnswer } from '../text/text.js'

/** @import {TextConfig} from '../text/text.js' */

const emailAddressRegex = /^[^@]+@[^@]+$/

const maxLength = 255
const emptyAddressError =
  'Enter the email address you would like the licence sent to'
const invalidAddressError =
  'Enter an email address in the correct format, like name@example.com'

const confirmationEnabled = config.get('featureFlags').emailConfirmation

/**
 * export @typedef {string} EmailAddressData
 * @typedef {{ emailAddress: EmailAddressData }} EmailAddressPayload
 */

/**
 * @augments {TextAnswer<EmailAddressPayload>}
 */
export class EmailAddressAnswer extends TextAnswer {
  /** @type {TextConfig} */
  static config = {
    payloadKey: 'emailAddress',
    stripWhitespace: true,
    type: 'email',
    spellcheck: false,
    autocomplete: 'email-address',
    characterWidth: 20,
    hint:
      (confirmationEnabled &&
        'A confirmation email will also be sent to this address') ||
      undefined,
    validation: {
      pattern: { regex: emailAddressRegex, message: invalidAddressError },
      maxLength: { value: maxLength, message: invalidAddressError },
      empty: { message: emptyAddressError }
    }
  }
}
