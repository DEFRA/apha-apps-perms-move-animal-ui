import { RadioButtonAnswer } from '../radio-button/radio-button.js'

/** @import {RadioButtonConfig} from '../radio-button/radio-button.js' */

/**
 * export @typedef {'yes'|'no'|'unknown'} QuantityHalfHerdData
 * @typedef {{ quantityHalfHerd: QuantityHalfHerdData }} QuantityHalfHerdPayload
 */

/**
 * @augments {RadioButtonAnswer<QuantityHalfHerdPayload>}
 */
export class QuantityHalfHerdAnswer extends RadioButtonAnswer {
  /** @type {RadioButtonConfig} */
  static config = {
    payloadKey: 'quantityHalfHerd',
    options: {
      no: { label: 'No' },
      yes: { label: 'Yes' },
      unknown: { label: "I don't know" }
    },
    errors: {
      emptyOptionText:
        'Select if the number of cattle will be larger than half of the destination herd size'
    },
    layout: 'stacked'
  }
}
