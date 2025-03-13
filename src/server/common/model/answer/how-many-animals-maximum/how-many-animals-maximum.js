import { NumberAnswer } from '../number/number.js'

const min = 1
const max = 5000

/** @import { NumberConfig } from '../number/number.js' */

/**
 * export @typedef {string} HowManyAnimalsMaximumData
 * @typedef {{ howManyAnimalsMaximum: string }} HowManyAnimalsMaximumPayload
 */

/**
 * @augments {NumberAnswer<HowManyAnimalsMaximumPayload>}
 */
export class HowManyAnimalsMaximumAnswer extends NumberAnswer {
  /** @type {NumberConfig} */
  static config = {
    payloadKey: 'howManyAnimalsMaximum',
    autocomplete: 'howManyAnimalsMaximum',
    characterWidth: 2,
    validation: {
      empty: {
        message: 'Enter the maximum number of animals you are planning to move'
      },
      max: { value: max, message: `Enter a number ${max} or below` },
      min: { value: min, message: `Enter a number ${min} or above` }
    }
  }
}
