import { RadioButtonAnswer } from '../radio-button/radio-button.js'

/** @import {RadioButtonConfig} from '../radio-button/radio-button.js' */

/**
 * export @typedef {'yes'|'no'|'unknown'} KeptSeparatelyData
 * @typedef {{ keptSeparately: KeptSeparatelyData }} KeptSeparatelyPayload
 */

/**
 * @augments {RadioButtonAnswer<KeptSeparatelyPayload>}
 */
export class KeptSeparatelyAnswer extends RadioButtonAnswer {
  /** @type {RadioButtonConfig} */
  static config = {
    payloadKey: 'keptSeparately',
    options: {
      yes: {
        label: 'Yes',
        labelI18nKey: 'tb.biosecurity.keptSeparately.options.yes.label'
      },
      no: {
        label: 'No',
        labelI18nKey: 'tb.biosecurity.keptSeparately.options.no.label'
      }
    },
    validation: {
      empty: 'Select if the incoming animals will be kept separately'
    },
    layout: 'inline'
  }
}
