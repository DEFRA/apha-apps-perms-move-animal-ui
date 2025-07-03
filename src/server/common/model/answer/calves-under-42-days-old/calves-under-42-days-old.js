import { RadioButtonAnswer } from '../radio-button/radio-button.js'

/** @import {RadioButtonConfig} from '../radio-button/radio-button.js' */

/**
 * export @typedef {'yes'|'no'} CalvesUnder42DaysOldData
 * @typedef {{ calvesUnder42DaysOld: CalvesUnder42DaysOldData }} CalvesUnder42DaysOldPayload
 */

/**
 * @augments {RadioButtonAnswer<CalvesUnder42DaysOldPayload>}
 */
export class CalvesUnder42DaysOldAnswer extends RadioButtonAnswer {
  /** @type {RadioButtonConfig} */
  static config = {
    payloadKey: 'calvesUnder42DaysOld',
    hint: 'We need to know if the calves are under 42 days old on the date you are planning to move them',
    options: {
      yes: { label: 'Yes' },
      no: { label: 'No' }
    },
    validation: {
      empty: 'Select if you will move any calves under 42 days old'
    },
    layout: 'inline'
  }
}
