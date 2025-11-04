import { CheckboxAnswer } from '../checkbox/checkbox.js'

/** @import {CheckboxConfig, CheckboxData} from '../checkbox/checkbox.js' */

/**
 * @typedef {{ buildingsHowMinimiseContamination: CheckboxData }} BuildingsHowMinimiseContaminationPayload
 */

/**
 * @augments {CheckboxAnswer<BuildingsHowMinimiseContaminationPayload>}
 */
export class BuildingsHowMinimiseContaminationAnswer extends CheckboxAnswer {
  /** @type {CheckboxConfig} */
  static config = {
    payloadKey: 'buildingsHowMinimiseContamination',
    isPageHeading: true,
    hint: 'Only select the measures you are taking. You do not need to select them all to receive your licence.',
    options: {
      cleaning: {
        label:
          'Cleaning and disinfecting of shared buildings before the animals arrive'
      },
      isolation: {
        label:
          'Isolation of incoming animals in a separate building, shed or pen on arrival'
      },
      incoming: {
        label: 'Incoming animals will be permanently housed'
      },
      disinfection: {
        label:
          'Disinfection points located at the housing entrances and exits'
      },
      other: {
        label: 'Other measures'
      }
    },
    validation: {
      empty: {
        message:
          'Enter how you will reduce the risk of spreading TB from the resident herd to the incoming animals during housing'
      }
    }
  }
}
