import { NumberAnswer } from '../number/number.js'

const min = 1
const max = 5000

/** @import { NumberConfig } from '../number/number.js' */

/**
 * export @typedef {string} HowManyAnimalsData
 * @typedef {{ howManyAnimals: string }} HowManyAnimalsPayload
 */

/**
 * @augments {NumberAnswer<HowManyAnimalsPayload>}
 */
export class HowManyAnimalsAnswer extends NumberAnswer {
  /** @type {NumberConfig} */
  static config = {
    payloadKey: 'howManyAnimals',
    autocomplete: 'howManyAnimals',
    characterWidth: 2,
    validation: {
      empty: {
        message: 'Enter how many animals you are planning to move',
        i18nKey: 'tb.destination.howManyAnimals.validation.empty'
      },
      max: {
        value: max,
        message: `Enter a number ${max} or below`,
        i18nKey: 'tb.destination.howManyAnimals.validation.max'
      },
      min: {
        value: min,
        message: `Enter a number ${min} or above`,
        i18nKey: 'tb.destination.howManyAnimals.validation.min'
      }
    }
  }
}
