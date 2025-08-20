import { CheckboxAnswer } from '../checkbox/checkbox.js'

/** @import {CheckboxConfig, CheckboxData} from '../checkbox/checkbox.js' */

/**
 * export @typedef {string} DilutionRateData
 * @typedef {{ dilutionRate: CheckboxData }} DilutionRatePayload
 */

/**
 * @augments {CheckboxAnswer<DilutionRatePayload>}
 */
export class DilutionRateAnswer extends CheckboxAnswer {
  /** @type {CheckboxConfig} */
  static config = {
    payloadKey: 'dilutionRate',
    isPageHeading: false,
    options: {
      dilutionRate: {
        label:
          'I confirm this is the dilution rate used on the farm or premises'
      }
    },
    validation: {
      empty: { message: 'You need to tick the confirmation box' }
    }
  }
}
