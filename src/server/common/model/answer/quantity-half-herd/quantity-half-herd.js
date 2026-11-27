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
      no: {
        label: 'No',
        labelI18nKey: 'tb.destination.quantityHalfHerd.options.no.label'
      },
      yes: {
        label: 'Yes',
        labelI18nKey: 'tb.destination.quantityHalfHerd.options.yes.label'
      },
      unknown: {
        label: "I don't know",
        labelI18nKey: 'tb.destination.quantityHalfHerd.options.unknown.label'
      }
    },
    validation: {
      empty: {
        message:
          'Select if the number of cattle will be larger than half of the destination herd size',
        i18nKey: 'tb.destination.quantityHalfHerd.validation.empty'
      }
    },
    layout: 'stacked'
  }
}
