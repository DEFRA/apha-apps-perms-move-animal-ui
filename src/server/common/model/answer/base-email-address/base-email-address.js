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
  `^[^@()<>\\[\\]:;,"\\\\]+@[^@]+\\.(${tldPattern})$`,
  'i'
)

const maxLength = 255

/**
 * export @typedef {string} BaseEmailAddressData
 * @typedef {{ emailAddress: BaseEmailAddressData }} BaseEmailAddressPayload
 */

/**
 * @augments {TextAnswer<BaseEmailAddressPayload>}
 */
export class BaseEmailAddressAnswer extends TextAnswer {
  /** @type {TextConfig} */
  static config = {
    payloadKey: 'emailAddress',
    stripWhitespace: true,
    type: 'email',
    spellcheck: false,
    autocomplete: 'email-address',
    characterWidth: 20,
    validation: {
      pattern: {
        regex: emailAddressRegex,
        message: 'Enter the email address in a valid format'
      },
      maxLength: {
        value: maxLength,
        message: 'Your answer must be no longer than 255 characters'
      },
      empty: { message: 'Enter the email address' }
    }
  }
}
