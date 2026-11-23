import { config } from '~/src/config/config.js'
import { BaseEmailAddressAnswer } from '../base-email-address/base-email-address.js'

/** @import {TextConfig} from '../text/text.js' */

/**
 * export @typedef {string} EmailAddressData
 * @typedef {{ mail: EmailAddressData }} EmailAddressPayload
 */

/**
 * @augments {BaseEmailAddressAnswer}
 */
export class EmailAddressAnswer extends BaseEmailAddressAnswer {
  /** @type {TextConfig} */
  static config = {
    ...BaseEmailAddressAnswer.config,
    validation: {
      ...BaseEmailAddressAnswer.config.validation,
      pattern: {
        regex: /** @type {RegExp} */ (
          BaseEmailAddressAnswer.config.validation.pattern?.regex
        ),
        message:
          'Enter an email address in the correct format, like name@example.com'
      },
      empty: {
        message: 'Enter the email address you would like the licence sent to'
      }
    }
  }

  get config() {
    const answerConfig = EmailAddressAnswer.config

    if (config.get('featureFlags').emailConfirmation) {
      answerConfig.hint =
        'A confirmation email will also be sent to this email address'
      answerConfig.hintI18nKey = 'common.answer.emailAddress.hint'
    }
    return answerConfig
  }
}
