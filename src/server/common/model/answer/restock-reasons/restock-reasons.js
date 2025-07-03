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
    options: {
      fattening: {
        label: 'Fattening'
      },
      breeding: {
        label: 'Breeding'
      },
      sucklingRestocking: {
        label: 'Suckling restocking'
      },
      dairyRestocking: {
        label: 'Dairy restocking'
      },
      other: {
        label: 'Something else'
      }
    },
    validation: {
      empty: {
        message: 'Select the reasons you have for restocking'
      }
    }
  }
}
