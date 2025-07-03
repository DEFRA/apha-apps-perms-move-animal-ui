import { RadioButtonAnswer } from '../radio-button/radio-button.js'

/** @import {RadioButtonConfig} from '../radio-button/radio-button.js' */

/**
 * export @typedef {'yes'|'no'} Animals42DaysOldOrOlderData
 * @typedef {{ animals42DaysOldOrOlder: Animals42DaysOldOrOlderData }} Animals42DaysOldOrOlderPayload
 */

/**
 * @augments {RadioButtonAnswer<Animals42DaysOldOrOlderPayload>}
 */
export class Animals42DaysOldOrOlderAnswer extends RadioButtonAnswer {
  /** @type {RadioButtonConfig} */
  static config = {
    payloadKey: 'animals42DaysOldOrOlder',
    options: {
      yes: { label: 'Yes' },
      no: { label: 'No' }
    },
    validation: {
      empty: 'Select if you are also moving any animals 42 days old or older'
    },
    layout: 'inline'
  }
}
