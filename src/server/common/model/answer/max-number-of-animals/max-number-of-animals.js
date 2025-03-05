import { TextAnswer } from '../text/text.js'

/** @import { TextConfig } from '../text/text.js' */

const wholeNumberRegex = /^\d+$/

/**
 * export @typedef {string} MaxNumberOfAnimalsData
 * @typedef {{ maxNumberOfAnimals: string }} MaxNumberOfAnimalsPayload
 */

/**
 * @augments {TextAnswer<MaxNumberOfAnimalsPayload>}
 */
export class MaxNumberOfAnimalsAnswer extends TextAnswer {
  /** @type {TextConfig} */
  static config = {
    payloadKey: 'maxNumberOfAnimals',
    autocomplete: 'maxNumberOfAnimals',
    characterWidth: 2,
    validation: {
      maxLength: {
        value: 5000,
        message: 'Your answer must be no longer than 5000 characters'
      },
      empty: { message: 'Enter how many animals you are planning to move' },
      pattern: { regex: wholeNumberRegex, message: 'Enter a number' }
    }
  }
}
