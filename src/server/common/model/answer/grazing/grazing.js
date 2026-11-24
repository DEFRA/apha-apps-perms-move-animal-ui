import { RadioButtonAnswer } from '../radio-button/radio-button.js'

/** @import {RadioButtonConfig} from '../radio-button/radio-button.js' */

/**
 * export @typedef {'yes'|'no'|'unknown'} GrazingData
 * @typedef {{ grazing: GrazingData }} GrazingPayload
 */

/**
 * @augments {RadioButtonAnswer<GrazingPayload>}
 */
export class GrazingAnswer extends RadioButtonAnswer {
  /** @type {RadioButtonConfig} */
  static config = {
    payloadKey: 'grazing',
    options: {
      yes: {
        label: 'Yes',
        labelI18nKey: 'tb.biosecurity.grazing.options.yes.label'
      },
      no: {
        label: 'No',
        labelI18nKey: 'tb.biosecurity.grazing.options.no.label'
      }
    },
    validation: {
      empty: 'Select if the incoming animals will be grazed'
    },
    layout: 'inline'
  }
}
