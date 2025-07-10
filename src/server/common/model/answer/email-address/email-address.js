import { config } from '~/src/config/config.js'
import { TextAnswer } from '../text/text.js'
import fs from 'fs'
import path from 'path'

/** @import {TextConfig} from '../text/text.js' */

const tldsPath = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  'tlds.txt'
)
const tldPattern = fs
  .readFileSync(tldsPath, 'utf-8')
  .split('\n')
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith('#'))
  .join('|')

const emailAddressRegex = new RegExp(
  `^[^@\\s]+@[^@\\s]+\\.(${tldPattern})$`,
  'i'
)

const maxLength = 255
const emptyAddressError =
  'Enter the email address you would like the licence sent to'
const invalidAddressError =
  'Enter an email address in the correct format, like name@example.com'

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
    validation: {
      pattern: { regex: emailAddressRegex, message: invalidAddressError },
      maxLength: { value: maxLength, message: invalidAddressError },
      empty: { message: emptyAddressError }
    }
  }

  get config() {
    const answerConfig = EmailAddressAnswer.config

    if (config.get('featureFlags').emailConfirmation) {
      answerConfig.hint =
        'A confirmation email will also be sent to this email address'
    }

    return answerConfig
  }
}
