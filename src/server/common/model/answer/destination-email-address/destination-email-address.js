import { BaseEmailAddressAnswer } from '../base-email-address/base-email-address.js'

/** @import {TextConfig} from '../text/text.js' */

/**
 * export @typedef {string} DestinationEmailAddressData
 * @typedef {{ destinationEmail: DestinationEmailAddressData }} DestinationEmailAddressPayload
 */

/**
 * @augments {BaseEmailAddressAnswer}
 */
export class DestinationEmailAddressAnswer extends BaseEmailAddressAnswer {
  /** @type {TextConfig} */
  static config = {
    ...BaseEmailAddressAnswer.config,
    payloadKey: 'destinationEmail',
    validation: {
      ...BaseEmailAddressAnswer.config.validation,
      empty: {
        message: 'Enter your email address',
        i18nKey: 'tb.licence.destinationEmailAddress.validation.empty'
      }
    }
  }

  get config() {
    return DestinationEmailAddressAnswer.config
  }
}
