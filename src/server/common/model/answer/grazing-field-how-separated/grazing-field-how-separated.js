import { CheckboxAnswer } from '../checkbox/checkbox.js'

/** @import {CheckboxConfig, CheckboxData} from '../checkbox/checkbox.js' */

/**
 * @typedef {{ grazingFieldHowSeparated: CheckboxData }} GrazingFieldHowSeparatedPayload
 */

/**
 * @augments {CheckboxAnswer<GrazingFieldHowSeparatedPayload>}
 */
export class GrazingFieldHowSeparatedAnswer extends CheckboxAnswer {
  /** @type {CheckboxConfig} */
  static config = {
    payloadKey: 'grazingFieldHowSeparated',
    hint: 'Only select the measures you are taking. You do not need to select them all to receive your licence.',
    options: {
      roadsCreateBoundary: {
        label: 'Roads create a boundary between the animals'
      },
      minimumThreeMetres: {
        label: 'A minimum of 3 metres will separate the animals',
        hint: 'Such as by hedges, doubling fencing or walls'
      },
      Other: {
        label: 'Other separation measures'
      }
    },
    validation: {
      empty: {
        message:
          'Select which measures are being taken to reduce the spread of TB when the animals are grazing'
      }
    }
  }
}
