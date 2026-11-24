import { CheckboxAnswer } from '../checkbox/checkbox.js'

/** @import {CheckboxConfig, CheckboxData} from '../checkbox/checkbox.js' */

/**
 * @typedef {{ restockReasons: CheckboxData }} RestockReasonPayload
 */

/**
 * @augments {CheckboxAnswer<RestockReasonPayload>}
 */
export class RestockReasonsAnswer extends CheckboxAnswer {
  /** @type {CheckboxConfig} */
  static config = {
    payloadKey: 'restockReasons',
    isPageHeading: true,
    hint: 'Select all that apply.',
    hintI18nKey: 'tb.biosecurity.restockReason.hint',
    options: {
      fattening: {
        label: 'Fattening',
        labelI18nKey: 'tb.biosecurity.restockReason.options.fattening.label'
      },
      breeding: {
        label: 'Breeding',
        labelI18nKey: 'tb.biosecurity.restockReason.options.breeding.label'
      },
      sucklingRestocking: {
        label: 'Suckling restocking',
        labelI18nKey:
          'tb.biosecurity.restockReason.options.sucklingRestocking.label'
      },
      dairyRestocking: {
        label: 'Dairy restocking',
        labelI18nKey:
          'tb.biosecurity.restockReason.options.dairyRestocking.label'
      },
      other: {
        label: 'Something else',
        labelI18nKey: 'tb.biosecurity.restockReason.options.other.label'
      }
    },
    validation: {
      empty: {
        message: 'Select the reasons you have for restocking'
      }
    }
  }
}
