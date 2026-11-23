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
      routineRestocking: {
        label: 'Routine restocking',
        labelI18nKey:
          'tb.destination.reasonForMovement.options.routineRestocking.label'
      },
      breedingMale: {
        label: 'Breeding male',
        labelI18nKey:
          'tb.destination.reasonForMovement.options.breedingMale.label'
      },
      welfare: {
        label: 'Welfare',
        hint: 'Including moving pregnant females',
        labelI18nKey: 'tb.destination.reasonForMovement.options.welfare.label',
        hintI18nKey: 'tb.destination.reasonForMovement.options.welfare.hint'
      },
      other: {
        label: 'Something else',
        labelI18nKey: 'tb.destination.reasonForMovement.options.other.label'
      }
    },
    validation: {
      empty: 'Select the reason for movement'
    },
    layout: 'stacked'
  }
}
