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
    hintI18nKey: 'tb.biosecurity.restockAnimals.hint',
    options: {
      calves: {
        label: 'Calves',
        labelI18nKey: 'tb.biosecurity.restockAnimals.options.calves.label'
      },
      heifers: {
        label: 'Heifers',
        labelI18nKey: 'tb.biosecurity.restockAnimals.options.heifers.label'
      },
      cows: {
        label: 'Cows',
        labelI18nKey: 'tb.biosecurity.restockAnimals.options.cows.label'
      },
      pregnantCows: {
        label: 'Pregnant cows',
        labelI18nKey: 'tb.biosecurity.restockAnimals.options.pregnantCows.label'
      },
      dairyCows: {
        label: 'Dairy cows',
        labelI18nKey: 'tb.biosecurity.restockAnimals.options.dairyCows.label'
      },
      sucklingCalves: {
        label: 'Suckling calves',
        labelI18nKey:
          'tb.biosecurity.restockAnimals.options.sucklingCalves.label'
      }
    },
    validation: {
      empty: {
        message: 'Select which types of animals you are restocking'
      }
    }
  }
}
