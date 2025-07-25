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
    validation: {
      empty: 'Select if the incoming animals will be grazed'
    },
    layout: 'inline'
  }
}
