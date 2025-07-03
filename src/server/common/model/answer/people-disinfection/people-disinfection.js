import { CheckboxAnswer } from '../checkbox/checkbox.js'

/** @import {CheckboxConfig, CheckboxData} from '../checkbox/checkbox.js' */

/**
 * @typedef {{ peopleDisinfection: CheckboxData }} PeopleDisinfectionPayload
 */

/**
 * @augments {CheckboxAnswer<PeopleDisinfectionPayload>}
 */
export class PeopleDisinfectionAnswer extends CheckboxAnswer {
  /** @type {CheckboxConfig} */
  static config = {
    payloadKey: 'peopleDisinfection',
    isPageHeading: true,
    hint: 'Only select the measures you are taking. You do not need to select them all to receive your licence.',
    options: {
      ppe: {
        label: 'Dedicated clothing and personal protective equipment (PPE)'
      },
      disinfectingBoots: {
        label: 'Cleaning and disinfecting wellington boots, including foot dips'
      },
      disinfectingOnArrivalAndDeparture: {
        label:
          'Cleaning and disinfection measures when contractor arrive and leave'
      },
      dedicatedStaff: {
        label: 'Dedicated staff looking after the incoming animals'
      },
      other: {
        label: 'Other cleaning and disinfection measures'
      }
    },
    errors: {}
  }
}
