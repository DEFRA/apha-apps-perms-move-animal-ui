import { RadioButtonAnswer } from '../radio-button/radio-button.js'

/** @import {RadioButtonConfig} from '../radio-button/radio-button.js' */

/**
 * export @typedef {'routineRestocking'|'breedingMale'|'welfare'|'other'} ReasonForMovementData
 * @typedef {{ reasonForMovement: ReasonForMovementData }} ReasonForMovementPayload
 */

/**
 * @augments {RadioButtonAnswer<ReasonForMovementPayload>}
 */
export class ReasonForMovementAnswer extends RadioButtonAnswer {
  /** @type {RadioButtonConfig} */
  static config = {
    payloadKey: 'reasonForMovement',
    options: {
      routineRestocking: { label: 'Routine restocking' },
      breedingMale: { label: 'Breeding male' },
      welfare: { label: 'Welfare', hint: 'Including moving pregnant females' },
      other: { label: 'Something else' }
    },
    errors: {
      emptyOptionText: 'Select the reason for movement'
    },
    layout: 'stacked'
  }
}
