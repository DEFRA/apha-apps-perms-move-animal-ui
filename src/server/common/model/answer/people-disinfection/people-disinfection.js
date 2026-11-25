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
    hintI18nKey: 'tb.biosecurity.peopleDisinfection.hint',
    options: {
      ppe: {
        label: 'Dedicated clothing and personal protective equipment (PPE)',
        labelI18nKey: 'tb.biosecurity.peopleDisinfection.options.ppe.label'
      },
      disinfectingBoots: {
        label:
          'Cleaning and disinfecting wellington boots, including foot dips',
        labelI18nKey:
          'tb.biosecurity.peopleDisinfection.options.disinfectingBoots.label'
      },
      disinfectingOnArrivalAndDeparture: {
        label:
          'Cleaning and disinfection measures when contractor arrive and leave',
        labelI18nKey:
          'tb.biosecurity.peopleDisinfection.options.disinfectingOnArrivalAndDeparture.label'
      },
      dedicatedStaff: {
        label: 'Dedicated staff looking after the incoming animals',
        labelI18nKey:
          'tb.biosecurity.peopleDisinfection.options.dedicatedStaff.label'
      },
      other: {
        label: 'Other cleaning and disinfection measures',
        labelI18nKey: 'tb.biosecurity.peopleDisinfection.options.other.label'
      }
    },
    validation: {}
  }
}
