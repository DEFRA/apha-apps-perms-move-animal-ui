import { RadioButtonAnswer } from '../radio-button/radio-button.js'

/** @import {RadioButtonConfig} from '../radio-button/radio-button.js' */

/**
 * export @typedef {'yes'|'no'|'unknown'} QuantityOptionsData
 * @typedef {{ quantityOptions: QuantityOptionsData }} QuantityOptionsPayload
 */

/**
 * @augments {RadioButtonAnswer<QuantityOptionsPayload>}
 */
export class QuantityOptionsAnswer extends RadioButtonAnswer {
  /** @type {RadioButtonConfig} */
  static config = {
    payloadKey: 'quantityOptions',
    options: {
      no: { label: 'No' },
      yes: { label: 'Yes' },
      unknown: { label: "I don't know" }
    },
    errors: {
      emptyOptionText: 'Select if you will move more than 75 animals'
    },
    layout: 'stacked'
  }
}
