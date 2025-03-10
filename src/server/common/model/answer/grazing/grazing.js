import { RadioButtonAnswer } from '../radio-button/radio-button.js'

/** @import {RadioButtonConfig} from '../radio-button/radio-button.js' */

/**
 * export @typedef {'yes'|'no'|'unknown'} GrazingData
 * @typedef {{ grazing: GrazingData }} GrazingPayload
 */

/**
 * @augments {RadioButtonAnswer<GrazingPayload>}
 */
export class GrazingAnswer extends RadioButtonAnswer {
  /** @type {RadioButtonConfig} */
  static config = {
    payloadKey: 'grazing',
    options: {
      yes: { label: 'Yes' },
      no: { label: 'No' }
    },
    errors: {
      emptyOptionText: 'Select if the incoming cattle will be grazed'
    },
    layout: 'inline'
  }
}
