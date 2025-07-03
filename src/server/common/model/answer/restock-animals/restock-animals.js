import { CheckboxAnswer } from '../checkbox/checkbox.js'

/** @import {CheckboxConfig, CheckboxData} from '../checkbox/checkbox.js' */

/**
 * @typedef {{ restockAnimals: CheckboxData }} RestockReasonPayload
 */

/**
 * @augments {CheckboxAnswer<RestockReasonPayload>}
 */
export class RestockAnimalsAnswer extends CheckboxAnswer {
  /** @type {CheckboxConfig} */
  static config = {
    payloadKey: 'restockAnimals',
    isPageHeading: true,
    hint: 'Select all that apply.',
    options: {
      calves: {
        label: 'Calves'
      },
      heifers: {
        label: 'Heifers'
      },
      cows: {
        label: 'Cows'
      },
      pregnantCows: {
        label: 'Pregnant cows'
      },
      dairyCows: {
        label: 'Dairy cows'
      },
      sucklingCalves: {
        label: 'Suckling calves'
      }
    },
    validation: {
      empty: {
        message: 'Select which types of animals you are restocking'
      }
    }
  }
}
